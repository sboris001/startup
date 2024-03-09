const express = require('express');
const app = express();

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Add movie endpoint
app.post('/api/addMovie', (req, res) => {
    // Extract movie data from request body
    const { title, rating } = req.body;
    // Add movie logic here
    addMovie(title, rating);
    res.status(200).send('Movie added successfully');
});

// Get movie ratings endpoint
app.get('/api/movieRatings', (req, res) => {
    // Retrieve
    const movieRatings = getMovieRatings();
    // Return
    res.status(200).json(movieRatings);
});

// Generate leaderboard endpoint
app.get('/api/leaderboard', (req, res) => {
    // Generate leaderboard logic here
    const leaderboard = generateLeaderboard();

    // Return leaderboard as JSON
    res.status(200).json(leaderboard);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});
  
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});