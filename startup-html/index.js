const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';

// The service port may be set on the command line
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the applications static content
app.use(express.static('public'));

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Login endpoint
apiRouter.post('/login', (req, res) => {
    const user = req.body;
    login(user);
    res.status(200).send('User has logged in successfully')
});

apiRouter.post('/logout', (req, res) => {
   logout();
   res.status(200).send('User was logged out successfully') 
});

// Get the user
apiRouter.get('/user', (req, res) => {
    const user = getUser();
    res.status(200).json(user);
})

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