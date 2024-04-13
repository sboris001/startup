import React from 'react';
import './library.css';

export function Library() {
    return (
        <main>
            <section className="mainTop">
                <section className="addMovie">
                    <div className="addPlacement">
                        <p>Add Movie</p>
                        <div style={{ padding: "0 0 0.5rem 0" }}>
                            <form className="addForm">
                                <div className="gridItem">Movie:&nbsp;&nbsp;</div>
                                <div className="formItem">&nbsp;&nbsp;<input className="input" type="text" name="movie" id="movie" placeholder="Enter a movie title" /></div>
                                <div className="gridItem">Your rating:&nbsp;&nbsp;</div>
                                <div className="formItem">&nbsp;&nbsp;<input className="input" type="text" name="rating" id="rating" placeholder="Enter your rating" /></div>
                                <div className="btn"><button className="btn2" id="add-button" type="submit">Add</button></div>
                            </form>
                        </div>
                    </div>
                </section>
                <div className="right">
                    <section className="alertSection">
                        <div className="alert event">
                            <div id="player-messages">
                                <div className="event">See other users' ratings here!</div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>

            <section className="titleSection">
                <div className="title"><h1 id="userName"></h1><h1>'s Library</h1></div>
                {/* Assuming displayUserName is implemented elsewhere */}
                {/* <script>
                    displayUserName();
                </script> */}
            </section>
            <section className="librarySection">
                {/* Here you can populate the librarySection with content */}
            </section>
        </main>
    );
}