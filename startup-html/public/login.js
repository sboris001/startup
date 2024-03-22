// function login() {
//     const nameEl = document.querySelector("#name");
//     const name = nameEl.value;
//     console.log(name);

//     fetch('/api/login', {
//         method: 'POST',
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8',
//         },
//         body: JSON.stringify({ user: name })
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log('Login successful:', data);
//         })
// }


async function loginUser() {
    loginOrCreate(`/api/auth/login`);
}
  
async function createUser() {
    loginOrCreate(`/api/auth/create`);
}
  
async function loginOrCreate(endpoint) {
    const userName = document.querySelector('#name')?.value;
    const password = document.querySelector('#password')?.value;
    if (userName === "") {
        alert("Please enter a username");
        return;
    } else if (password === "") {
        alert("Please enter a password");
        return;
    }
    const response = await fetch(endpoint, {
        method: 'post',
        body: JSON.stringify({ username: userName, password: password }),
        headers: {
        'Content-type': 'application/json; charset=UTF-8',
        },
    });

    if (response.ok) {
        localStorage.setItem('userName', userName);
        window.location.href = 'library.html';
    } else {
        const body = await response.json();
        alert(`⚠ Error: ${body.msg}`);
    }
}