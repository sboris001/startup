import React, { useEffect, useState } from 'react';
import './library.css';

export function Library({ userName }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        if (userName) {
            localStorage.setItem('userName', userName);
        }
        fetchMovies();
        establishWebSocket();
    }, []);

    async function fetchMovies() {
        try {
            const response = await fetch('/api/getMovies');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const movies = await response.json();
            console.log('Movies received:', movies);
            setMovies(movies);
            displayMovies(movies); // Call displayMovies after setting movies state
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }

    function establishWebSocket() {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

        socket.onopen = (event) => {
            console.log('WebSocket opened');
        };
        socket.onclose = (event) => {
            console.log('WebSocket closed');
        };
        socket.onmessage = async (event) => {
            const ratingMessage = JSON.parse(event.data);
            console.log(ratingMessage);
            updatePlayerMessages(ratingMessage);
        };
    }

    function updatePlayerMessages(ratingMessage) {
        const chatText = document.querySelector('#player-messages');
        const { user, movieTitle, rating } = ratingMessage;
        const newMessage = `<div class="event"><span class="player-event">${user}</span> rated "${movieTitle}" ${rating}</div>`;
        chatText.innerHTML = newMessage + chatText.innerHTML;
        const messages = chatText.querySelectorAll('.event');
        if (messages.length > 5) {
            messages[messages.length - 1].remove();
        }
    }

    function displayMovies(movies) {
        const librarySection = document.querySelector('.librarySection');
        movies.forEach(movie => {
            const { title, rating } = movie;
            getMovieInfoPromise(title)
                .then(movieData => {
                    const { title, poster } = movieData;
                    if (!poster || poster === 'N/A') {
                        alert(`No information found for "${title}". Please be more specific.`);
                        return;
                    }
                    displayMoviePoster(poster, title, rating);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });
    }

    function displayMoviePoster(poster, title, rating) {
        const librarySection = document.querySelector('.librarySection');

        // Check if the movie already exists in the library
        if (movies.some(movie => movie.title.toLowerCase() === title.toLowerCase())) {
            console.log(`"${title}" is already in your library.`);
            return;
        }

        // Create poster element
        const divElement = document.createElement('div');
        divElement.classList.add('libraryItems');

        const imgElement = document.createElement('img');
        imgElement.src = poster;
        imgElement.alt = title;
        imgElement.height = '250';
        divElement.appendChild(imgElement);

        const paragraph1 = document.createElement('p');
        paragraph1.textContent = title;
        paragraph1.style.color = "white";
        divElement.appendChild(paragraph1);

        const paragraph2 = document.createElement('p');
        paragraph2.textContent = rating;
        paragraph2.style.color = "white";
        divElement.appendChild(paragraph2);

        librarySection.appendChild(divElement);
    }

    async function getMovieInfoPromise(title) {
        const query = queryString(title);

        try {
            const response = await fetch(query);
            const data = await response.json();
            return {
                title: data.Title,
                poster: data.Poster
            };
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    function queryString(title) {
        const cleanTitle = title.split(" ");
        let string = "";
        for (const element of cleanTitle) {
            if (element !== cleanTitle[cleanTitle.length - 1]) {
                string = string + element + "+";
            } else {
                string = string + element;
            }
        }
        return `https://www.omdbapi.com/?t=${string}&apikey=4fcd8264`;
    }

    const addMovieFromForm = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        const movieTitle = document.getElementById('movie').value;
        const ratingInput = document.getElementById('rating').value;
        await addMovie(movieTitle, ratingInput);
    };

    const addMovie = async (movieTitle, ratingInput) => {
        // Validate the rating input
        const rating = parseFloat(ratingInput);
        if (isNaN(rating) || rating < 0 || rating > 10) {
            alert("Invalid rating: Please enter a number between 0.0 and 10.0");
            return false;
        }

        // Check if the movie already exists in the library
        if (movies.some(movie => movie.title.toLowerCase() === movieTitle.toLowerCase())) {
            alert(`"${movieTitle}" is already in your library.`);
            return false;
        }

        try {
            // Fetch movie data and display poster
            const movieData = await getMovieInfoPromise(movieTitle);
            const { title, poster } = movieData;

            // Check if the poster URL is "N/A" or an empty string
            if (!poster || poster === 'N/A') {
                // Display an alert to the user indicating the movie information couldn't be found
                alert(`No information found for "${movieTitle}". Please check spelling or be more specific.`);
                return; // Exit the function if the poster URL is "N/A" or empty
            }

            // Save the updated movie library
            await fetch('/api/addMovie', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: movieTitle, rating: rating.toFixed(1) })
            });

            // Update the local state to include the new movie
            setMovies(prevMovies => [...prevMovies, { title: movieTitle, rating: rating.toFixed(1) }]);

            // Display the poster of the added movie
            displayMoviePoster(poster, title, rating.toFixed(1));

            // Send WebSocket message to update other clients
            sendWebSocketMessage({ user: localStorage.getItem('userName'), movieTitle, rating: rating.toFixed(1) });

        } catch (error) {
            console.error('Error adding movie:', error);
            return false;
        }
    };

    function sendWebSocketMessage(message) {
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
        socket.onopen = () => {
            const { user, movieTitle, rating } = message;
            const newMessage = {
                user: user,
                movieTitle: movieTitle,
                rating: rating
            };
            socket.send(JSON.stringify(newMessage));
        };
    }

    return (
        <main className="bg">
            <section className="mainTop">
                <section className="addMovie">
                    <div className="addPlacement">
                        <p>Add Movie</p>
                        <div style={{ padding: "0 0 0.5rem 0" }}>
                            <form className="addForm" onSubmit={addMovieFromForm}>
                                <div className="gridItem">Movie:&nbsp;&nbsp;</div>
                                <div className="formItem">&nbsp;&nbsp;<input className="input" type="text" name="movie" id="movie" placeholder="Enter a movie title" /></div>
                                <div className="gridItem">Your rating:&nbsp;&nbsp;</div>
                                <div className="formItem">&nbsp;&nbsp;<input className="input" type="text" name="rating" id="rating" placeholder="Enter your rating" /></div>
                                <div className="btn"><button className="btn2" id="add-button" type="submit">Add</button></div>
                            </form>
                        </div>
                    </div>
                </section>
                <div className="right">
                    <section className="alertSection">
                        <div className="alert event">
                            <div id="player-messages">
                                <div className="event">See other users' ratings here!</div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>

            <section className="titleSection">
                <div className="title"><h1 id="userName">{localStorage.getItem('userName')}</h1><h1>'s Library</h1></div>
            </section>
            <section className="librarySection">
            </section>
        </main>
    );
}
