function getUser(){
    if (localStorage.getItem('userName') === '') {
        return "User";
    }
    return localStorage.getItem('userName');
}

function movieName() {
    const nameEl = document.querySelector("#movie");
    localStorage.setItem("movie", nameEl.value);
    window.location.href = "library.html";
}

function getMovieName() {
    return localStorage.getItem("movie");
}

function getRating() {
    return localStorage.getItem("rating");
}

function rating() {
    const nameEl = document.querySelector("#rating")
    localStorage.setItem("rating", nameEl.value);
    window.location.href = "library.html"
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
    return `http://www.omdbapi.com/?t=${string}&apikey=4fcd8264`;
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


function addMovie() {
    const movieTitle = document.getElementById('movie').value;
    const ratingInput = document.getElementById('rating').value;

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

    // Retrieve existing movie library or initialize an empty array
    let movieLibrary = JSON.parse(localStorage.getItem('movieLibrary')) || [];
    
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
                
                // Save the updated movie library in local storage
                localStorage.setItem('movieLibrary', JSON.stringify(movieLibrary));
                
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


document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the entire movie library from local storage
    const movieLibrary = JSON.parse(localStorage.getItem('movieLibrary')) || [];

    // Display all the movies in the library
        movieLibrary.forEach(movie => {
            fetchAndDisplayMoviePoster(movie.title, movie.rating);
        });
});

function clearLocalStorage() {
    // Clear the entire local storage
    localStorage.clear();
}

// Set the maximum number of messages to display
const MAX_MESSAGES = 5;

// Function to simulate chat messages that will come over WebSocket
setInterval(() => {
    const rating = (Math.floor(Math.random() * 10) + Math.round(Math.random() * 10) / 10).toFixed(1);
    const chatText = document.querySelector('#player-messages');
    let users = ["Greg", "Frederick", "Hershey", "Marcell", "Jose", "Ignacio", "Albert", "Grace", "Horacio", "Patrick", "Lucas", "Luke", "Brighton"];
    let movies = ["The Dark Knight", "Bee Movie", "Jumanji", "Get Smart", "Red Notice", "Brightburn", "Spider-man", "Ironman", "Logan Lucky", "21 Jump Street", "The Peanut Butter Falcon", "The Godfather Part II", "The Godfather", "Pulp Fiction"];

    // Create a new message
    const newMessage = `<div class="event"><span class="player-event">${getRandomItem(users)}</span> rated "${getRandomItem(movies)}" ${rating}</div>`;

    // Add the new message to the top of the message list
    chatText.innerHTML = newMessage + chatText.innerHTML;

    // Check if the number of messages exceeds the maximum limit
    const messages = chatText.querySelectorAll('.event');
    if (messages.length > MAX_MESSAGES) {
        // Remove the oldest message
        messages[messages.length - 1].remove();
    }
}, 5000);

// Function to get a random item from an array
function getRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}
