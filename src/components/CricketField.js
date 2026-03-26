import React from 'react';
import './CricketField.css';

// ============================================================
// CRICKET FIELD COMPONENT
// Draws the 2D cricket pitch/field using CSS + SVG
// Shows the batsman, stumps, and animates the ball
// ============================================================

function CricketField({ ballAnimation, batAnimation, isOut }) {
  return (
    <div className="field-wrapper">
      {/* Sky / Crowd area */}
      <div className="sky">
        <span className="crowd">👥👥👥👥👥👥👥👥👥👥👥👥👥👥👥</span>
      </div>

      {/* Main Outfield (green grass) */}
      <div className="outfield">

        {/* Cricket Pitch (brown strip in centre) */}
        <div className="pitch">

          {/* STUMPS on the left side */}
          <div className="stumps left-stumps">
            <div className="stump"></div>
            <div className="stump"></div>
            <div className="stump"></div>
          </div>

          {/* 
            BALL: Uses CSS animation classes
            - 'bowling' class: ball travels from right (bowler) to left (batsman)
            - The animation is triggered by changing the class in App.js
          */}
          <div className={`ball ${ballAnimation ? 'bowling' : ''}`}>
            ⚪
          </div>

          {/* 
            BATSMAN: Simple emoji-based sprite
            - 'batting' class triggers the swing animation
            - 'out-animation' class plays when a wicket falls
          */}
          <div className={`batsman ${batAnimation ? 'batting' : ''} ${isOut ? 'out-animation' : ''}`}>
            🏏🧍
          </div>

          {/* STUMPS on the right side (bowler end) */}
          <div className="stumps right-stumps">
            <div className="stump"></div>
            <div className="stump"></div>
            <div className="stump"></div>
          </div>

        </div>{/* end pitch */}
      </div>{/* end outfield */}

      {/* Ground shadow / bottom grass */}
      <div className="ground-bottom"></div>
    </div>
  );
}

export default CricketField;
