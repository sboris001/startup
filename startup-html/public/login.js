function login() {
    clearUsersStorage();
    const nameEl = document.querySelector("#name");
    const name = nameEl.value;
    console.log(name);

    fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ user: name })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Login successful:', data);
        })
}


function clearUsersStorage() {
    fetch ('/api/logout')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
}
