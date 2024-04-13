import React from 'react';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Library } from './library/library';
import { Leaderboard } from './leaderboard/leaderboard';



export default function App() {
    return (
        <BrowserRouter>
            <html lang="en" className="bg">
                <body>
                    <menu className="topnav">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/library">Library</NavLink>
                        <NavLink to="/leaderboard">Leaderboard</NavLink>
                    </menu>
                    <main>
                        <div className="center">
                            <Routes>
                                <Route path="/" element={<Login />} />
                                <Route path="/library" element={<Library />} />
                                <Route path="/leaderboard" element={<Leaderboard />} />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </div>
                    </main>
                    <footer>
                        <section className="author">
                            <p>&nbsp;&nbsp;&nbsp;Spencer Boris: &nbsp;&nbsp;&nbsp;<a href="https://github.com/sboris001/startup">GitHub</a></p>
                        </section>
                    </footer>
                </body>
            </html>
        </BrowserRouter>
    );
}

function NotFound() {
    return <main>404: Return to sender. Address unknown.</main>
}