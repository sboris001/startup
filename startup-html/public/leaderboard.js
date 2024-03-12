// leaderboard.js


async function getMovies() {
    try {
        const response = await fetch('/api/getMovies');
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
    // Calculate the average rating and number of ratings for each movie
    let totalRating = 0;
    for (let i = 0; i < movieRatings.length; i++) {
        totalRating += parseFloat(movieRatings[i].rating);
    }

    const averageRating = totalRating / movieRatings.length;
    return {
        averageRating: averageRating.toFixed(1),
        numberOfRatings: movieRatings.length
    };
}

// Function to display the leaderboard with top 10 movies
function displayLeaderboard(topMovies) {
    const leaderboardTable = document.getElementById('leaderboard-table');
    let tableBody = '';

    // Iterate through the top 10 movies and populate the table
    for (let i = 0; i < topMovies.length; i++) {
        const movie = topMovies[i];
        tableBody += `
            <tr>
                <td>${i + 1}</td>
                <td>${movie.title}</td>
                <td>${movie.averageRating}</td>
                <td>${movie.numberOfRatings}</td>
            </tr>
        `;
    }

    // Update the table body with the generated rows
    leaderboardTable.innerHTML += tableBody;
}

// Main function to generate the leaderboard
async function generateLeaderboard() {
    const movieRatings = await getMovies();
    const moviesWithAverages = movieRatings.map(movie => {
        return {
            title: movie.title,
            ...calculateAverageRating([movie])
        };
    });

    // Sort movies by average rating in descending order
    const sortedMovies = moviesWithAverages.sort((a, b) => b.averageRating - a.averageRating);

    // Display top 10 movies in the leaderboard
    const top10Movies = sortedMovies.slice(0, 10);
    displayLeaderboard(top10Movies);
}

// Call the main function when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    generateLeaderboard();
});
