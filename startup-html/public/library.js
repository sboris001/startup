// Establish WebSocket connection
const socketUrl = `ws://${window.location.hostname}:${window.location.port}`;
const socket = new WebSocket(socketUrl);

// Event handler for WebSocket connection open
socket.addEventListener('open', function(event) {
    console.log('WebSocket connection established');
});

// Event handler for WebSocket errors
socket.addEventListener('error', function(event) {
    console.error('WebSocket error:', event);
});

// Event handler for WebSocket connection close
socket.addEventListener('close', function(event) {
    console.log('WebSocket connection closed');
});

// Event handler for WebSocket messages
socket.addEventListener('message', function(event) {
    const MAX_MESSAGES = 5;
    console.log(event.data)
    const ratingMessage = JSON.parse(event.data);
    const { user, movieTitle, rating } = ratingMessage;
    const chatText = document.querySelector('#player-messages');

    if (socket.readyState === WebSocket.OPEN) {
        // Process the message
        console.log(ratingMessage);
        console.log(user);
        console.log(movieTitle);
        console.log(rating);
    } else {
        console.error('WebSocket connection is not open');
    }
    // Create a new message
    
    const newMessage = `<div class="event"><span class="player-event">${user}</span> rated "${movieTitle}" ${rating}</div>`;
    chatText.innerHTML = newMessage + chatText.innerHTML;

    // Check if the number of messages exceeds the maximum limit
    const messages = chatText.querySelectorAll('.event');
    if (messages.length > MAX_MESSAGES) {
        // Remove the oldest message
        messages[messages.length - 1].remove();
    }

    // Update or add movie to the library display
    fetchAndDisplayMoviePoster(movieTitle, rating);
});

function getUser() {
    return localStorage.getItem('userName');
}

function displayUserName() {
    const element = document.getElementById("userName");
    const user = getUser();
    element.innerHTML = user;
}

function addMovieFromForm() {
    const movieTitle = document.getElementById('movie').value;
    const ratingInput = document.getElementById('rating').value;
    addMovie(movieTitle, ratingInput);
    return false;
}

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

function displayMovies() {
    const element = document.getElementById("userName");
    getMovies()
        .then(movie => {
            console.log(movie);
        })
        .catch(error => {
            console.error('Error fetching movie data:', error);
        });
}

function createPoster(src, alt, height, title, rating) {
    let divElement = document.createElement('div');
    divElement.classList.add('libraryItems');

    let imgElement = document.createElement('img');
    imgElement.src = src;
    imgElement.alt = alt;
    imgElement.height = height;
    divElement.appendChild(imgElement);

    let paragraph1 = document.createElement('p');
    paragraph1.textContent = title;
    paragraph1.style.color = "white";
    divElement.appendChild(paragraph1);

    let paragraph2 = document.createElement('p');
    paragraph2.textContent = rating;
    paragraph2.style.color = "white";
    divElement.appendChild(paragraph2);

    return divElement;
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

async function getMovieInfoPromise(title) {
    let query = queryString(title);

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

                // Display the poster
                fetchAndDisplayMoviePoster(title, formattedRating);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return false;
}

function fetchAndDisplayMoviePoster(movieTitle, rating) {
    getMovieInfoPromise(movieTitle)
        .then(movieData => {
            const { title, poster } = movieData;

            // Check if the poster URL is "N/A" or an empty string
            if (!poster || poster === 'N/A') {
                // Display an alert to the user indicating the movie information couldn't be found
                alert(`No information found for "${title}". Please be more specific.`);
                return; // Exit the function if the poster URL is "N/A" or empty
            }

            const targetSection = document.querySelector('.librarySection');

            const imageData = {
                src: poster,
                alt: title,
                height: '250',
                title: title,
                rating: rating
            };

            const image = createPoster(imageData.src, imageData.alt, imageData.height, imageData.title, imageData.rating);
            targetSection.appendChild(image);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

document.addEventListener('DOMContentLoaded', async function() {
    const movieLibrary =  await getMovies();
    console.log("MovieLibrary: ", movieLibrary)

    for (const movie of movieLibrary){
        fetchAndDisplayMoviePoster(movie.title, movie.rating)
    }
});

async function logout() {
    try {
        await fetch('/api/auth/logout', {
            method: 'DELETE',
            credentials: 'same-origin' // include credentials for cross-origin requests
        });
        localStorage.clear(); // Clear local storage if needed
        // Optionally redirect to the login page or perform other actions upon successful logout
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error logging out:', error);
    }
}

// Authentication
document.addEventListener('DOMContentLoaded', async function() {
    const isAuthenticated = await checkAuthentication();
    if (!isAuthenticated) {
        window.location.href = 'login.html';
    }
});

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


