import React from 'react';
import './GameOver.css';
import { TOTAL_BALLS } from '../gameConfig';

// ============================================================
// GAME OVER COMPONENT
// Shown when the match ends (overs done or all wickets lost)
//
// Props:
//   runs       - final run total
//   wickets    - how many wickets fell
//   ballsPlayed - total balls faced
//   onRestart  - function to reset the game
// ============================================================

function GameOver({ runs, wickets, ballsPlayed, onRestart }) {
  // Determine performance message based on score
  const getMessage = () => {
    if (wickets >= 2 && ballsPlayed < 6) return { text: "Bowled Out Early! 😢", color: '#e74c3c' };
    if (runs >= 60) return { text: "Incredible Innings! 🏆", color: '#f1c40f' };
    if (runs >= 40) return { text: "Great Batting! 🔥", color: '#2ecc71' };
    if (runs >= 20) return { text: "Decent Effort! 👍", color: '#3498db' };
    return { text: "Better Luck Next Time! 💪", color: '#e67e22' };
  };

  const msg = getMessage();
  const strikeRate = ballsPlayed > 0 ? ((runs / ballsPlayed) * 100).toFixed(1) : '0.0';

  return (
    <div className="gameover-overlay">
      <div className="gameover-card">

        {/* Title */}
        <div className="gameover-title">INNINGS COMPLETE</div>

        {/* Result message */}
        <div className="gameover-message" style={{ color: msg.color }}>
          {msg.text}
        </div>

        {/* Final stats */}
        <div className="final-stats">
          <div className="final-stat">
            <span className="final-value">{runs}</span>
            <span className="final-label">RUNS</span>
          </div>
          <div className="final-stat">
            <span className="final-value">{wickets}</span>
            <span className="final-label">WICKETS</span>
          </div>
          <div className="final-stat">
            <span className="final-value">{ballsPlayed}</span>
            <span className="final-label">BALLS</span>
          </div>
          <div className="final-stat">
            <span className="final-value">{strikeRate}</span>
            <span className="final-label">STRIKE RATE</span>
          </div>
        </div>

        {/* Restart button */}
        <button className="restart-btn" onClick={onRestart}>
          🔄 PLAY AGAIN
        </button>

      </div>
    </div>
  );
}

export default GameOver;
