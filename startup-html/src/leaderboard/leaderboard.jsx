import React from 'react';
import "./leaderboard.css";

export function Leaderboard() {

    return (
        <main style={{ paddingBottom: '25px' }}>
            <section className="spacing"></section>
            <div className="leaderBoardTitle">
                Movie Ratings Leaderboard
            </div>

            <table id="leaderboard-table">
                {/* Table rows will be dynamically populated by JavaScript */}
            </table>
        </main>
    );
}
