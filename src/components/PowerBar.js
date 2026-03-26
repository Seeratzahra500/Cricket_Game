import React from 'react';
import './PowerBar.css';
import { PROBABILITIES } from '../gameConfig';

// ============================================================
// POWER BAR COMPONENT
// Shows colored probability segments + a moving slider
// The player clicks to "stop" the slider and determine the shot result
//
// Props:
//   style       - 'aggressive' or 'defensive'
//   sliderPos   - 0.0 to 1.0 (current slider position)
//   onShot      - function called when player clicks (plays the shot)
//   disabled    - true when animations are running (prevents double-click)
// ============================================================

function PowerBar({ style, sliderPos, onShot, disabled }) {
  // Get the probability segments for the current batting style
  const segments = PROBABILITIES[style];

  return (
    <div className="powerbar-wrapper">
      <p className="powerbar-label">⚡ POWER BAR — Click to Play Shot!</p>

      {/* The main power bar container */}
      <div
        className={`powerbar ${disabled ? 'disabled' : ''}`}
        onClick={disabled ? null : onShot}
      >
        {/* 
          Render each probability segment as a colored block.
          The width % = probability × 100
          e.g., prob=0.40 → width: 40%
        */}
        {segments.map((seg, index) => (
          <div
            key={index}
            className="segment"
            style={{
              width: `${seg.prob * 100}%`,
              backgroundColor: seg.color,
            }}
          >
            {/* Show label only if segment is wide enough */}
            {seg.prob >= 0.08 && (
              <span className="segment-label">
                {seg.outcome === 'Wicket' ? 'W' : seg.outcome}
              </span>
            )}
          </div>
        ))}

        {/* 
          SLIDER
          Position is controlled by sliderPos (0 to 1)
          Translated as percentage across the bar
        */}
        <div
          className="slider"
          style={{ left: `${sliderPos * 100}%` }}
        >
          <div className="slider-arrow">▼</div>
          <div className="slider-line"></div>
        </div>

      </div>{/* end powerbar */}

      {/* Probability markers below the bar */}
      <div className="prob-markers">
        {segments.reduce((acc, seg, i) => {
          const prev = acc.total;
          acc.total += seg.prob;
          // Show marker at the boundary between segments
          if (i < segments.length - 1) {
            acc.markers.push(
              <span
                key={i}
                className="marker"
                style={{ left: `${acc.total * 100}%` }}
              >
                {acc.total.toFixed(2)}
              </span>
            );
          }
          return acc;
        }, { total: 0, markers: [] }).markers}
      </div>

      {/* Legend showing what each color means */}
      <div className="legend">
        {segments.map((seg, i) => (
          <div key={i} className="legend-item">
            <span
              className="legend-color"
              style={{ backgroundColor: seg.color }}
            ></span>
            <span className="legend-text">
              {seg.outcome} ({Math.round(seg.prob * 100)}%)
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}

export default PowerBar;
