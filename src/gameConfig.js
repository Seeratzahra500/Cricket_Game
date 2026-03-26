// ============================================================
// GAME CONFIGURATION
// This file holds all the settings and probability data
// ============================================================

// How many overs and wickets in the game
export const TOTAL_BALLS = 12;  // 2 overs × 6 balls
export const TOTAL_WICKETS = 2;

// ---------------------------------------------------------------
// PROBABILITY DISTRIBUTIONS
// Each outcome has a probability. All must add up to 1.0
// The power bar is divided into segments matching these values.
// ---------------------------------------------------------------

export const PROBABILITIES = {
  // AGGRESSIVE: High risk (40% wicket) but high reward (25% boundaries)
  aggressive: [
    { outcome: 'Wicket', prob: 0.40, color: '#e74c3c', emoji: '🏏' },
    { outcome: '0',      prob: 0.10, color: '#95a5a6', emoji: '😐' },
    { outcome: '1',      prob: 0.10, color: '#3498db', emoji: '🏃' },
    { outcome: '2',      prob: 0.10, color: '#2ecc71', emoji: '🏃' },
    { outcome: '3',      prob: 0.05, color: '#1abc9c', emoji: '🔥' },
    { outcome: '4',      prob: 0.10, color: '#f39c12', emoji: '🎯' },
    { outcome: '6',      prob: 0.15, color: '#9b59b6', emoji: '💥' },
  ],

  // DEFENSIVE: Lower risk (20% wicket) but lower reward (10% boundaries)
  defensive: [
    { outcome: 'Wicket', prob: 0.20, color: '#e74c3c', emoji: '🏏' },
    { outcome: '0',      prob: 0.25, color: '#95a5a6', emoji: '😐' },
    { outcome: '1',      prob: 0.25, color: '#3498db', emoji: '🏃' },
    { outcome: '2',      prob: 0.15, color: '#2ecc71', emoji: '🏃' },
    { outcome: '3',      prob: 0.05, color: '#1abc9c', emoji: '🔥' },
    { outcome: '4',      prob: 0.05, color: '#f39c12', emoji: '🎯' },
    { outcome: '6',      prob: 0.05, color: '#9b59b6', emoji: '💥' },
  ],
};

// ---------------------------------------------------------------
// COMMENTARY LINES
// Shown after each ball result - adds fun to the game!
// ---------------------------------------------------------------
export const COMMENTARY = {
  Wicket: [
    "Oh no! The stumps are shattered! 💔",
    "OUT! The bowler celebrates wildly!",
    "That's a big wicket! Walk of shame... 😢",
  ],
  '0': [
    "Dot ball. The bowler is pumped!",
    "Good length delivery, nothing doing.",
    "Tight bowling, no run scored.",
  ],
  '1': [
    "Pushed to the leg side, one run.",
    "Good running between the wickets!",
    "One more to the total.",
  ],
  '2': [
    "Nice placement, two runs!",
    "Good running! 2 runs added.",
    "Driven through the gap, two!",
  ],
  '3': [
    "Excellent running, 3 runs!",
    "Great effort in the field, only 3!",
    "They'll take 3 on that one!",
  ],
  '4': [
    "FOUR! Cracking shot through covers! 🎯",
    "BOUNDARY! Races to the rope!",
    "Four runs! Beautifully timed!",
  ],
  '6': [
    "SIX! That's gone into the crowd! 💥",
    "MAXIMUM! What a hit! 🚀",
    "That's out of the park! Six runs!",
  ],
};

// ---------------------------------------------------------------
// HELPER FUNCTION: getOutcome
// Given the slider position (0 to 1) and batting style,
// figure out which segment the slider is in.
// ---------------------------------------------------------------
export function getOutcome(sliderPos, style) {
  const segments = PROBABILITIES[style];
  let cumulative = 0; // running total of probabilities

  for (let i = 0; i < segments.length; i++) {
    cumulative += segments[i].prob;
    // If slider is within this cumulative range, this is the outcome
    if (sliderPos <= cumulative) {
      return segments[i].outcome;
    }
  }

  // Fallback (shouldn't happen if probabilities sum to 1)
  return segments[segments.length - 1].outcome;
}

// ---------------------------------------------------------------
// HELPER FUNCTION: getRandomCommentary
// Pick a random commentary line for a given outcome
// ---------------------------------------------------------------
export function getRandomCommentary(outcome) {
  const lines = COMMENTARY[outcome] || ['Good shot!'];
  const randomIndex = Math.floor(Math.random() * lines.length);
  return lines[randomIndex];
}
