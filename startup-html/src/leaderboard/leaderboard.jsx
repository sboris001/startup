import React, { useEffect, useState } from 'react';
import "./leaderboard.css";

export function Leaderboard() {
    const [topMovies, setTopMovies] = useState([]);

    useEffect(() => {
        generateLeaderboard();
    }, []);

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

    async function generateLeaderboard() {
        try {
            const movieRatings = await getMovies();
            const averageRatings = calculateAverageRating(movieRatings);
            const sortedMovies = Object.keys(averageRatings)
                .map(title => ({
                    title: title,
                    averageRating: averageRatings[title],
                    numberOfRatings: movieRatings.filter(movie => movie.title === title).length
                }))
                .sort((a, b) => b.averageRating - a.averageRating)
                .slice(0, 10);
            setTopMovies(sortedMovies);
        } catch (error) {
            console.error('Error generating leaderboard:', error);
        }
    }


    return (
        <main style={{ paddingBottom: '25px' }}>
            <section className="spacing"></section>
            <div className="leaderBoardTitle">
                Movie Ratings Leaderboard
            </div>

            <table id="leaderboard-table">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Title</th>
                        <th>Average Rating</th>
                        <th>Number of Ratings</th>
                    </tr>
                </thead>
                <tbody>
                    {topMovies.map((movie, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{movie.title}</td>
                            <td>{movie.averageRating}</td>
                            <td>{movie.numberOfRatings}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}
