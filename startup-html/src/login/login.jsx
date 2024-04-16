import React from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';

export function Login({ setUserName }) {
    const navigate = useNavigate();

    async function loginUser() {
        await loginOrCreate(`/api/auth/login`, navigate);
    }
      
    async function createUser() {
        await loginOrCreate(`/api/auth/create`, navigate);
    }
      
    async function loginOrCreate(endpoint, navigate) {
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
            setUserName(userName);
            navigate('/library');
        } else {
            const body = await response.json();
            alert(`⚠ Error: ${body.msg}`);
        }
    }

    return (
        <main>
            <div className="cameraIcon"><img src="./cameraIcon.svg" className="icon" height="105" width="105" alt="Camera Icon" /></div>
            <div className="center">
                <form className="login" method="get">
                    <h3>Movie Rater</h3>
                    <input type="text" id="name" placeholder="Username" autoComplete="username" />
                    <input type="password" id="password" placeholder="Password" autoComplete="current-password" />
                    <button className="btn1" onClick={(event) => { event.preventDefault(); loginUser(); }}>Login</button>
                    <button className="btn1" onClick={(event) => { event.preventDefault(); createUser(); }}>Create</button>
                </form>
            </div>
        </main>
    );
}
