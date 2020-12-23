'use strict';
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const modal = document.querySelector('.model');
const closemodel = document.querySelector('.close-model');
const openmodel = document.querySelector('.show-model');
const overlay = document.querySelector('.overlay');
const score0EL = document.getElementById('score--0');
const score1EL = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// starting conditions
let currentScore, activePlayer, playing, scores;
const init = function () {
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

// switching player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//  Rolling dice functionality
btnRoll.addEventListener('click', function () {
  // Generating the random dice roll
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
      console.log(dice);
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

// holding the score
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      switchPlayer();
    }
  }
});

// Resetting
btnNew.addEventListener('click', function () {
  init();
});

const displayModel = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const hideModel = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

openmodel.addEventListener('click', displayModel);
closemodel.addEventListener('click', hideModel);
overlay.addEventListener('click', hideModel);
