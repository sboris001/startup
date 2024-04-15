import React from 'react';
import { useEffect, useState } from 'react';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Library } from './library/library';
import { Leaderboard } from './leaderboard/leaderboard';



export default function App() {

    const [userName, setUserName] = useState('');

    function NotFound() {
        return <main>404: Return to sender. Address unknown.</main>
    }

    return (
        <BrowserRouter>
                <div className="body bg" id="pageContainer">
                    <menu className="topnav">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/library">Library</NavLink>
                        <NavLink to="/leaderboard">Leaderboard</NavLink>
                    </menu>
                            <Routes>
                                <Route path="/" element={<Login setUserName={setUserName} />} />
                                <Route path="/library" element={<Library userName={userName} />} />
                                <Route path="/leaderboard" element={<Leaderboard />} />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                    <footer>
                        <section className="author">
                            <p>&nbsp;&nbsp;&nbsp;Spencer Boris: &nbsp;&nbsp;&nbsp;<a href="https://github.com/sboris001/startup">GitHub</a></p>
                        </section>
                    </footer>
                </div>
        </BrowserRouter>
    );
}
