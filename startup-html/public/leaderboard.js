// leaderboard.js

async function getMovies() {
    try {
        const response = await fetch('/api/getAllMovies');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const movies = await response.json();
        console.log('Movies received:', movies);
        return movies;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
}

// Function to calculate the average rating for a specific movie
function calculateAverageRating(movieRatings) {
    // Create an object to store ratings and counts for each movie title
    const ratingCounts = {};
    const ratingSums = {};

    // Iterate through each movie rating
    movieRatings.forEach(movie => {
        const title = movie.title;
        const rating = parseFloat(movie.rating);

        // If the title is already present, update the rating sum and count
        if (ratingCounts[title]) {
            ratingSums[title] += rating;
            ratingCounts[title]++;
        } else {
            // If the title is not present, initialize the rating sum and count
            ratingSums[title] = rating;
            ratingCounts[title] = 1;
        }
    });

    // Calculate average ratings for each movie
    const averages = {};
    for (const title in ratingCounts) {
        averages[title] = (ratingSums[title] / ratingCounts[title]).toFixed(1);
    }

    return averages;
}

// Function to display the leaderboard with top 10 movies
function displayLeaderboard(topMovies) {
    const leaderboardTable = document.getElementById('leaderboard-table');
    let tableBody = '';

    // Iterate through the top 10 movies and populate the table
    topMovies.forEach((movie, index) => {
        tableBody += `
            <tr>
                <td>${index + 1}</td>
                <td>${movie.title}</td>
                <td>${movie.averageRating}</td>
                <td>${movie.numberOfRatings}</td>
            </tr>
        `;
    });

    // Update the table body with the generated rows
    leaderboardTable.innerHTML = tableBody;
}

// Main function to generate the leaderboard
async function generateLeaderboard() {
    const movieRatings = await getMovies();
    const averageRatings = calculateAverageRating(movieRatings);

    // Convert averageRatings object to an array of objects
    const sortedMovies = Object.keys(averageRatings)
        .map(title => ({
            title: title,
            averageRating: averageRatings[title],
            numberOfRatings: movieRatings.filter(movie => movie.title === title).length
        }))
        .sort((a, b) => b.averageRating - a.averageRating)
        .slice(0, 10);

    // Display top 10 movies in the leaderboard
    displayLeaderboard(sortedMovies);
}

// Call the main function when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    generateLeaderboard();
});
