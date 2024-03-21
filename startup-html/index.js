const express = require('express');
const app = express();
const DB = require('./database.js');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

const authCookieName = 'token';

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
    if (await DB.getUser(req.body.username)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = await DB.createUser(req.body.username, req.body.password);

        // Set the cookie
        setAuthCookie(res, user.token);

        res.send({
        id: user._id,
        });
    }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
    const user = await DB.getUser(req.body.email);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
        setAuthCookie(res, user.token);
        res.send({ id: user._id });
        return;
        }
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
    res.clearCookie(authCookieName);
    res.status(204).end();
});

// GetUser returns information about a user
apiRouter.get('/user/:username', async (req, res) => {
    const user = await DB.getUser(req.params.username);
    if (user) {
        const token = req?.cookies.token;
        res.send({ username: user.username, authenticated: token === user.token });
        return;
    }
    res.status(404).send({ msg: 'Unknown' });
});

// secureApiRouter verifies credentials for endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// GetRatings
// secureApiRouter.get('/ratings', async (req, res) => {
//     const ratings = await DB.getHighScores();
//     res.send(scores);
// });

// SubmitRating
// secureApiRouter.post('/score', async (req, res) => {
//     const score = { ...req.body, ip: req.ip };
//     await DB.addScore(score);
//     const scores = await DB.getHighScores();
//     res.send(scores);
// });

// Default error handler
app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

// // Login endpoint
// apiRouter.post('/login', (req, res) => {
//     const user = req.body;
//     login(user);
//     res.status(200).send('User has logged in successfully')
// });

// apiRouter.post('/logout', (req, res) => {
//    logout();
//    res.status(200).send('User was logged out successfully') 
// });

// // Get the user
// apiRouter.get('/user', (req, res) => {
//     const user = getUser();
//     res.status(200).json(user);
// })

// Add movie endpoint
apiRouter.post('/addMovie', (req, res) => {
    const { title, rating } = req.body;
    console.log(title)
    console.log(rating)
    addMovie({ title, rating });
    res.status(200).json({ message: 'Movie added successfully' });
});

// Get movies
apiRouter.get('/getMovies', (req, res) => {
    // Retrieve
    const movies = getMovies();
    // Return
    res.status(200).json(movies);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});
  
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

// Methods

var movies = []
function addMovie(movie) {
    movies.push(movie);
}

function getMovies() {
    return movies;
}
var users
function login(user) {
    users = user;
    movies = [];
}

function getUser() {
    return users;
}