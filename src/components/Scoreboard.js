import React from 'react';
import './Scoreboard.css';
import { TOTAL_BALLS, TOTAL_WICKETS } from '../gameConfig';

// ============================================================
// SCOREBOARD COMPONENT
// Shows the current game stats: runs, wickets, overs
// Props passed in from App.js (the parent component)
// ============================================================

function Scoreboard({ runs, wickets, ballsPlayed }) {
  // Calculate current over and ball within that over
  const currentOver = Math.floor(ballsPlayed / 6);     // e.g. 7 balls = over 1
  const ballInOver = ballsPlayed % 6;                  // e.g. 7 balls = 1 ball in over 1
  const ballsLeft = TOTAL_BALLS - ballsPlayed;

  return (
    <div className="scoreboard">
      {/* Team Name / Title */}
      <div className="scoreboard-title">🏏 CRICKET GAME</div>

      {/* Main Stats */}
      <div className="scoreboard-stats">

        {/* Runs */}
        <div className="stat-box">
          <span className="stat-value">{runs}</span>
          <span className="stat-label">RUNS</span>
        </div>

        {/* Separator */}
        <div className="stat-divider">/</div>

        {/* Wickets */}
        <div className="stat-box">
          <span className="stat-value wicket-color">{wickets}</span>
          <span className="stat-label">WICKETS</span>
        </div>
      </div>

      {/* Over and Balls info */}
      <div className="scoreboard-overs">
        <span>Overs: {currentOver}.{ballInOver} / 2.0</span>
        <span className="balls-left"> | Balls Left: {ballsLeft}</span>
      </div>

      {/* Wickets remaining indicator */}
      <div className="wickets-remaining">
        {Array.from({ length: TOTAL_WICKETS }).map((_, i) => (
          <span
            key={i}
            className={`wicket-dot ${i < wickets ? 'wicket-lost' : 'wicket-alive'}`}
          >
            🏏
          </span>
        ))}
      </div>
    </div>
  );
}

export default Scoreboard;
