import React, { useEffect } from 'react';
import './library.css';

export function Library({ userName }) {

    const name = userName;

    useEffect(() => {
        if (userName) {
            localStorage.setItem('userName', userName);
        }
        fetchMovies();
        establishWebSocket();
    }, []);

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

    async function fetchMovies() {
        try {
            const response = await fetch('/api/getMovies');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const movies = await response.json();
            console.log('Movies received:', movies);
            displayMovies(movies);
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
            const ratingMessage = JSON.parse(await event.data);
            console.log(ratingMessage);
            const { user, movieTitle, rating } = ratingMessage;
            const chatText = document.querySelector('#player-messages');
            const newMessage = `<div class="event"><span class="player-event">${user}</span> rated "${movieTitle}" ${rating}</div>`;
            chatText.innerHTML = newMessage + chatText.innerHTML;
            const messages = chatText.querySelectorAll('.event');
            if (messages.length > 5) {
                messages[messages.length - 1].remove();
            }
        };
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
                    const image = createPoster(poster, title, '250', title, rating);
                    librarySection.appendChild(image);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        });
    }

    function createPoster(src, alt, height, title, rating) {
        const divElement = document.createElement('div');
        divElement.classList.add('libraryItems');

        const imgElement = document.createElement('img');
        imgElement.src = src;
        imgElement.alt = alt;
        imgElement.height = height;
        divElement.appendChild(imgElement);

        const paragraph1 = document.createElement('p');
        paragraph1.textContent = title;
        paragraph1.style.color = "white";
        divElement.appendChild(paragraph1);

        const paragraph2 = document.createElement('p');
        paragraph2.textContent = rating;
        paragraph2.style.color = "white";
        divElement.appendChild(paragraph2);

        return divElement;
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

    function addMovieFromForm() {
        const movieTitle = document.getElementById('movie').value;
        const ratingInput = document.getElementById('rating').value;
        addMovie(movieTitle, ratingInput);
        return false;
    }

    async function addMovie(movieTitle, ratingInput) {
        // Validate the rating input
        const rating = parseFloat(ratingInput);
        if (isNaN(rating)) {
            // Display an alert if the rating is not a number
            alert("Invalid rating: Please enter a number");
            return false;
        }
        if (rating < 0 || rating > 10) {
            alert("Invalid rating: Please enter a number between 0.0 and 10.0");
            return false;
        }
    
        // Format the rating to always have one decimal place
        const formattedRating = rating.toFixed(1);
    
        // Send user rating information over WebSocket
        const user = getUser();
        const ratingMessage = {
            user: user,
            movieTitle: movieTitle,
            rating: formattedRating
        };
        console.log(ratingMessage)
        socket.send(JSON.stringify(ratingMessage));
    
        // Retrieve existing movie library or initialize an empty array
        let movieLibrary = await getMovies();
    
        // Check if the movie already exists in the library
        const existingMovieIndex = movieLibrary.findIndex(movie => movie.title === movieTitle);
    
        if (existingMovieIndex !== -1) {
            // Update the rating of the existing movie
            movieLibrary[existingMovieIndex].rating = formattedRating;
        } else {
            // Fetch movie data and display poster
            getMovieInfoPromise(movieTitle)
                .then(movieData => {
                    const { title, poster } = movieData;
    
                    // Check if the poster URL is "N/A" or an empty string
                    if (!poster || poster === 'N/A') {
                        // Display an alert to the user indicating the movie information couldn't be found
                        alert(`No information found for "${movieTitle}". Please check spelling or be more specific.`);
                        return; // Exit the function if the poster URL is "N/A" or empty
                    }
    
                    // Add the new movie to the library with the formatted rating
                    movieLibrary.push({ title: movieTitle, rating: formattedRating });
    
                    // Save the updated movie library
                    fetch('/api/addMovie', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({title: movieTitle, rating: formattedRating})
                    })
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            displayMovies(movieLibrary);
        }
    
        return false;
    }

    async function logout() {
        try {
            await fetch('/api/auth/logout', {
                method: 'DELETE',
                credentials: 'same-origin' // include credentials for cross-origin requests
            });
            localStorage.clear(); // Clear local storage if needed
            // Optionally redirect to the login page or perform other actions upon successful logout
            window.location.href = '/';
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }
    async function checkAuthentication() {
        try {
            const response = await fetch('/api/auth/check', {
                method: 'GET',
                credentials: 'same-origin' // include credentials for cross-origin requests
            });
            return response.ok;
        } catch (error) {
            console.error('Error checking authentication:', error);
            return false;
        }
    }

    return (
        
        <main className="bg">
            <section className="mainTop">
                <section className="addMovie">
                    <div className="addPlacement">
                        <p>Add Movie</p>
                        <div style={{ padding: "0 0 0.5rem 0" }}>
                            <form className="addForm">
                                <div className="gridItem">Movie:&nbsp;&nbsp;</div>
                                <div className="formItem">&nbsp;&nbsp;<input className="input" type="text" name="movie" id="movie" placeholder="Enter a movie title" /></div>
                                <div className="gridItem">Your rating:&nbsp;&nbsp;</div>
                                <div className="formItem">&nbsp;&nbsp;<input className="input" type="text" name="rating" id="rating" placeholder="Enter your rating" /></div>
                                <div className="btn"><button className="btn2" id="add-button" onClick={() => { addMovieFromForm() }} type="submit">Add</button></div>
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
                <div className="title"><h1 id="userName">{ localStorage.getItem('userName') }</h1><h1>'s Library</h1></div>
            </section>
            <section className="librarySection">
            </section>
        </main>
    );
}
