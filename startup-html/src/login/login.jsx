import React from 'react';
import './login.css';

export function Login() {
    const loginUser = () => {
        // Implement login functionality
    };

    const createUser = () => {
        // Implement create user functionality
    };

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
