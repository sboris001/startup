import React from 'react';
import './app.css';

export default function App() {
    return (
        <html lang="en" className="bg">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="stylesheet" href="index.css" />
                <link rel="stylesheet" href="styles.css" />
                <title>Home</title>
            </head>
            <body>
                <header>
                    <nav>
                        <menu className="topnav">
                            <a href="index.html">Home</a>
                            <a href="library.html">Library</a>
                            <a href="leaderboard.html">Leaderboard</a>
                        </menu>
                    </nav>
                </header>

                <main>
                    <div className="center">
                    </div>
                </main>

                <footer>
                    <section className="author">
                        <p>&nbsp;&nbsp;&nbsp;Spencer Boris: &nbsp;&nbsp;&nbsp;<a href="https://github.com/sboris001/startup">GitHub</a></p>
                    </section>
                </footer>

            </body>
        </html>
    );
  }