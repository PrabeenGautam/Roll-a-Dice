'use strict';

//Referencing player final score
let player1Score = document.querySelector('#score--0');
let player2Score = document.querySelector('#score--1');

//Referencing player current score
let player1CurrentScore = document.getElementById('current--0');
let player2CurrentScore = document.getElementById('current--1');
let currentPlayer = 0;
let levelFinish = false;
console.log(typeof levelFinish);

//Reference to dice images
let dice = document.querySelector('.dice');

player1Score.textContent = player2Score.textContent = 0;
player1CurrentScore.textContent = player2CurrentScore.textContent = 0;
let currentScore = Number(player1CurrentScore.textContent);

//Initializing making dice hidden
dice.classList.add('hidden');

//Function to switch player
const switchPlayer = function () {
  if (currentPlayer === 0) {
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.remove('player--active');
    currentPlayer = 1;
  } else {
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.remove('player--active');
    currentPlayer = 0;
  }

  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.add('player--active');
  dice.classList.add('hidden');
};

//Function to roll dice randomly
const rollDiceFunction = function () {
  if (!levelFinish) {
    //Generating random value for dice
    let diceRoll = Math.trunc(Math.random() * 6) + 1;
    dice.src = `./images/dice-${diceRoll}.png`;
    if (diceRoll === 1) {
      currentScore = 0;
      document.getElementById(`current--${currentPlayer}`).textContent =
        currentScore;
      switchPlayer();
    } else {
      currentScore += diceRoll;
      document.getElementById(`current--${currentPlayer}`).textContent =
        currentScore;
      dice.classList.remove('hidden');
    }
  }
};

document
  .querySelector('.btn--roll')
  .addEventListener('click', rollDiceFunction);

document.querySelector('.btn--hold').addEventListener('click', function () {
  if (currentPlayer === 0) {
    player1Score.textContent =
      Number(player1Score.textContent) +
      Number(player1CurrentScore.textContent);
    player1CurrentScore.textContent = 0;
  } else {
    player2Score.textContent =
      Number(player2Score.textContent) +
      Number(player2CurrentScore.textContent);
    player2CurrentScore.textContent = 0;
  }
  currentScore = 0;

  if (
    Number(document.getElementById(`score--${currentPlayer}`).textContent) >= 20
  ) {
    document
      .querySelector(`.player--${currentPlayer}`)
      .classList.add('player--winner');
    levelFinish = true;
    dice.classList.add('hidden');
  } else switchPlayer();
});

document.querySelector('.btn--new').addEventListener('click', function () {
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.remove('player--winner');
  currentPlayer = 1;
  switchPlayer();
  player1Score.textContent = 0;
  player2Score.textContent = 0;
  levelFinish = false;
});
