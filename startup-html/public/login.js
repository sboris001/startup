function login() {
    clearLocalStorage();
    const nameEl = document.querySelector("#name");
    localStorage.setItem("userName", nameEl.value);
    window.location.href = "library.html";
    console.log(localStorage.getItem("userName"));
}

function clearLocalStorage() {
    // Clear the entire local storage
    localStorage.clear();
}
