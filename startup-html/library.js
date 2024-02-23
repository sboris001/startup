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
