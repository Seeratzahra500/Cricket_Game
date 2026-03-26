import React, { useState, useEffect, useRef } from 'react';
import './App.css';

// Import all our components
import Scoreboard from './components/Scoreboard';
import CricketField from './components/CricketField';
import PowerBar from './components/PowerBar';
import StyleSelector from './components/StyleSelector';
import GameOver from './components/GameOver';

// Import game configuration and helper functions
import {
  TOTAL_BALLS,
  TOTAL_WICKETS,
  getOutcome,
  getRandomCommentary
} from './gameConfig';

// ============================================================
// APP COMPONENT — Main Game Controller
// 
// This is the "brain" of the game. It:
//   1. Holds all the game state (runs, wickets, etc.)
//   2. Controls the slider animation using useEffect + useRef
//   3. Handles what happens when the player clicks (plays a shot)
//   4. Passes data down to child components as props
// ============================================================

function App() {

  // ---- GAME STATE (useState hooks) ----
  // These are variables that React watches. When they change, the UI re-renders.

  const [runs, setRuns]               = useState(0);           // Total runs scored
  const [wickets, setWickets]         = useState(0);           // Wickets fallen
  const [ballsPlayed, setBallsPlayed] = useState(0);           // Balls bowled so far
  const [battingStyle, setBattingStyle] = useState('aggressive'); // Current batting style
  const [sliderPos, setSliderPos]     = useState(0);           // 0.0 to 1.0
  const [isAnimating, setIsAnimating] = useState(false);       // Block clicks during animation
  const [ballAnim, setBallAnim]       = useState(false);       // Trigger ball animation
  const [batAnim, setBatAnim]         = useState(false);       // Trigger bat swing animation
  const [isOut, setIsOut]             = useState(false);       // Trigger out animation
  const [commentary, setCommentary]   = useState('🏏 Welcome! Select your batting style and click the power bar to play!');
  const [lastResult, setLastResult]   = useState(null);        // Last shot result
  const [gameOver, setGameOver]       = useState(false);       // Is the game finished?

  // ---- REFS ----
  // useRef holds values that DON'T cause re-renders when changed.
  // Perfect for animation IDs and real-time slider tracking.

  const sliderRef      = useRef(0);       // Current slider position (real-time)
  const directionRef   = useRef(1);       // 1 = moving right, -1 = moving left
  const animFrameRef   = useRef(null);    // requestAnimationFrame ID (so we can cancel it)
  const isAnimatingRef = useRef(false);   // Mirrors isAnimating state, but accessible in animation loop

  // ---- SLIDER ANIMATION ----
  // useEffect runs after the component mounts (loads).
  // This starts the slider moving back and forth continuously.

  useEffect(() => {
    const SPEED = 0.005; // How fast the slider moves (lower = slower)

    function animateSlider() {
      // Move slider in current direction
      sliderRef.current += SPEED * directionRef.current;

      // Bounce off edges (0 and 1)
      if (sliderRef.current >= 1) {
        sliderRef.current = 1;
        directionRef.current = -1; // Reverse direction
      } else if (sliderRef.current <= 0) {
        sliderRef.current = 0;
        directionRef.current = 1; // Reverse direction
      }

      // Only update state (and re-render) if not in the middle of a shot animation
      // This prevents performance issues during animations
      if (!isAnimatingRef.current) {
        setSliderPos(sliderRef.current);
      }

      // Schedule the next frame (this creates a loop ~60fps)
      animFrameRef.current = requestAnimationFrame(animateSlider);
    }

    // Start the animation loop
    animFrameRef.current = requestAnimationFrame(animateSlider);

    // Cleanup: stop the loop when the component unmounts
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []); // Empty array = run only once on mount


  // ---- PLAY SHOT HANDLER ----
  // Called when player clicks the power bar

  function handleShot() {
    // Don't do anything if a shot is already being processed or game is over
    if (isAnimating || gameOver) return;

    // Freeze the slider at its current position
    const clickedPos = sliderRef.current;

    // Determine the outcome based on which segment the slider is in
    const outcome = getOutcome(clickedPos, battingStyle);

    // Get a random commentary line for this outcome (bonus feature)
    const commentaryLine = getRandomCommentary(outcome);

    // --- Start the shot sequence ---
    setIsAnimating(true);
    isAnimatingRef.current = true;

    // STEP 1: Show ball bowling animation
    setBallAnim(true);

    setTimeout(() => {
      // STEP 2: After ball reaches batsman, trigger bat swing
      setBallAnim(false);
      setBatAnim(true);

      if (outcome === 'Wicket') {
        setIsOut(true); // Trigger out animation
      }

      setTimeout(() => {
        // STEP 3: Reset animations and update game state
        setBatAnim(false);
        setIsOut(false);

        // Update runs
        const runsScored = outcome === 'Wicket' ? 0 : parseInt(outcome);
        setRuns(prev => prev + runsScored);

        // Update wickets
        const newWickets = outcome === 'Wicket' ? wickets + 1 : wickets;
        if (outcome === 'Wicket') setWickets(prev => prev + 1);

        // Update balls count
        const newBalls = ballsPlayed + 1;
        setBallsPlayed(newBalls);

        // Show result and commentary
        setLastResult(outcome);
        setCommentary(`${outcome === 'Wicket' ? '❌' : runsScored === 6 ? '💥' : runsScored === 4 ? '🎯' : '✅'} ${commentaryLine}`);

        // Check if game is over
        const allOut = newWickets >= TOTAL_WICKETS;
        const oversFinished = newBalls >= TOTAL_BALLS;

        if (allOut || oversFinished) {
          setGameOver(true);
        }

        // Re-enable the power bar
        setIsAnimating(false);
        isAnimatingRef.current = false;

      }, 600); // Wait 0.6s for bat swing animation
    }, 700); // Wait 0.7s for bowling animation
  }


  // ---- RESTART HANDLER ----
  // Reset everything back to the start

  function handleRestart() {
    setRuns(0);
    setWickets(0);
    setBallsPlayed(0);
    setBattingStyle('aggressive');
    setSliderPos(0);
    setIsAnimating(false);
    isAnimatingRef.current = false;
    sliderRef.current = 0;
    directionRef.current = 1;
    setBallAnim(false);
    setBatAnim(false);
    setIsOut(false);
    setLastResult(null);
    setCommentary('🏏 New game! Select your batting style and click to play!');
    setGameOver(false);
  }


  // ---- RENDER ----
  // This is the JSX that describes what the UI looks like.
  // React will update the DOM automatically when state changes.

  return (
    <div className="app">

      {/* Game over overlay (shown when match ends) */}
      {gameOver && (
        <GameOver
          runs={runs}
          wickets={wickets}
          ballsPlayed={ballsPlayed}
          onRestart={handleRestart}
        />
      )}

      {/* Main game layout */}
      <div className="game-container">

        {/* TOP ROW: Scoreboard */}
        <div className="top-row">
          <Scoreboard
            runs={runs}
            wickets={wickets}
            ballsPlayed={ballsPlayed}
          />

          {/* Last result badge */}
          {lastResult && (
            <div className={`result-badge ${lastResult === 'Wicket' ? 'result-wicket' : lastResult === '6' ? 'result-six' : lastResult === '4' ? 'result-four' : 'result-runs'}`}>
              {lastResult === 'Wicket' ? '❌ OUT!' : `+${lastResult} RUN${lastResult !== '1' ? 'S' : ''}`}
            </div>
          )}
        </div>

        {/* CRICKET FIELD with animations */}
        <CricketField
          ballAnimation={ballAnim}
          batAnimation={batAnim}
          isOut={isOut}
        />

        {/* COMMENTARY BOX */}
        <div className="commentary-box">
          <span className="commentary-text">{commentary}</span>
        </div>

        {/* BATTING STYLE SELECTOR */}
        <StyleSelector
          style={battingStyle}
          onChange={setBattingStyle}
          disabled={isAnimating}
        />

        {/* POWER BAR */}
        <PowerBar
          style={battingStyle}
          sliderPos={sliderPos}
          onShot={handleShot}
          disabled={isAnimating || gameOver}
        />

        {/* RESTART button (always visible at bottom) */}
        <button className="restart-small-btn" onClick={handleRestart}>
          🔄 Restart Game
        </button>

      </div>
    </div>
  );
}

export default App;
