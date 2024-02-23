function login() {
    const nameEl = document.querySelector("#name");
    localStorage.setItem("userName", nameEl.value);
    window.location.href = "library.html";
    console.log(localStorage.getItem("userName"))
}