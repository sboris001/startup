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
    divElement.classList.add('libraryItems')

    let imgElement = document.createElement('img');
    imgElement.src = src;
    imgElement.alt = alt;
    imgElement.height = height;
    divElement.appendChild(imgElement);

    let paragraph = document.createElement('p');
    paragraph.textContent = `${title}\n${rating}`;
    divElement.appendChild(paragraph);

    return divElement
}

function getMovieInfoPromise(title) {
    const cleanTitle = title.split(" ");
    let string = "";
    for (const element of cleanTitle) {
      if (element !== cleanTitle[cleanTitle.length - 1]) {
        string = string + element + "+";
      } else {
        string = string + element;
      }
    }
    const query = `http://www.omdbapi.com/?t=${string}&apikey=4fcd8264`

    return fetch(query)
        .then(response => response.json())
        .then(data => {
            return {
                title: data.Title,
                poster: data.Poster
            };
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error;
        });
}


function addMovie() {
    const movieTitle = document.getElementById('movie').value;
    const rating = document.getElementById('rating').value;
    fetchAndDisplayMoviePoster(movieTitle, rating);
    return false;
}

function fetchAndDisplayMoviePoster(movieTitle, rating) {
    getMovieInfoPromise(movieTitle)
        .then(movieData => {
            const { title, poster } = movieData;
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
