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