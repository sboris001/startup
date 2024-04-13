import React from 'react';
import './login.css';

export function Login() {
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
            window.location.href = '/library';
        } else {
            const body = await response.json();
            alert(`⚠ Error: ${body.msg}`);
        }
    }

    return (
        <main>
            <div className="cameraIcon"><img src="assets/cameraIcon.svg" className="icon" height="105" width="105" alt="Camera Icon" /></div>
            <div className="center">
                <form className="login" method="get">
                    <h3>Movie Rater</h3>
                    <input type="text" id="name" placeholder="Username" />
                    <input type="password" id="password" placeholder="Password" />
                    <button className="btn1" onClick={(event) => { event.preventDefault(); loginUser(); }}>Login</button>
                    <button className="btn1" onClick={(event) => { event.preventDefault(); createUser(); }}>Create</button>
                </form>
            </div>
        </main>
    );
}
