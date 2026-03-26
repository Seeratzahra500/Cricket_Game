import React from 'react';
import './StyleSelector.css';

// ============================================================
// STYLE SELECTOR COMPONENT
// Buttons to switch between Aggressive and Defensive batting
//
// Props:
//   style    - current style ('aggressive' or 'defensive')
//   onChange - function to call when a new style is selected
//   disabled - true during animations (prevents switching mid-shot)
// ============================================================

function StyleSelector({ style, onChange, disabled }) {
  return (
    <div className="style-selector">
      <p className="style-label">SELECT BATTING STYLE</p>

      <div className="style-buttons">

        {/* AGGRESSIVE button */}
        <button
          className={`style-btn aggressive-btn ${style === 'aggressive' ? 'active' : ''}`}
          onClick={() => onChange('aggressive')}
          disabled={disabled}
        >
          <span className="btn-icon">⚡</span>
          <div className="btn-content">
            <span className="btn-name">AGGRESSIVE</span>
            <span className="btn-desc">High Risk · High Reward</span>
            <span className="btn-stats">Wicket: 40% | 6s: 15%</span>
          </div>
        </button>

        {/* DEFENSIVE button */}
        <button
          className={`style-btn defensive-btn ${style === 'defensive' ? 'active' : ''}`}
          onClick={() => onChange('defensive')}
          disabled={disabled}
        >
          <span className="btn-icon">🛡️</span>
          <div className="btn-content">
            <span className="btn-name">DEFENSIVE</span>
            <span className="btn-desc">Low Risk · Steady Runs</span>
            <span className="btn-stats">Wicket: 20% | 6s: 5%</span>
          </div>
        </button>

      </div>
    </div>
  );
}

export default StyleSelector;
