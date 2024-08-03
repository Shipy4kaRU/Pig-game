'use strict';

const dice = document.querySelector('.dice');
const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHoldScore = document.querySelector('.btn--hold');

const score = [
  document.getElementById('score--0'),
  document.getElementById('score--1'),
];
const currentScore = [
  document.getElementById('current--0'),
  document.getElementById('current--1'),
];
const players = [
  document.querySelector('.player--0'),
  document.querySelector('.player--1'),
];

let currentScoreValue = 0;
let activePlayer = 0;

const newGame = function () {
  players[0].classList.add('player--active');
  players[1].classList.remove('player--active');
  players[0].classList.remove('player--winner');
  players[1].classList.remove('player--winner');
  for (let i = 0; i < score.length; i++) {
    score[i].textContent = 0;
    currentScore[i].textContent = 0;
  }
  btnHoldScore.style.display = '';
  btnRollDice.style.display = '';
  dice.style.display = 'none';
  btnNewGame.style.outline = '';
};

const isActive = function () {
  for (let i = 0; i < players.length; i++) {
    if (players[i].classList.contains('player--active')) {
      return i;
    }
  }
};

const rollDice = function () {
  dice.style.display = '';
  currentScoreValue = Math.ceil(Math.random() * 6);
  dice.src = `./dice${currentScoreValue}.png`;
  activePlayer = isActive();
  if (currentScoreValue == 1) {
    currentScore[activePlayer].textContent = 0;
    currentScoreValue = 0;
    changePlayer();
  } else {
    currentScore[activePlayer].textContent =
      Number(currentScore[activePlayer].textContent) + currentScoreValue;
  }
};

const changePlayer = function () {
  players[0].classList.toggle('player--active');
  players[1].classList.toggle('player--active');
};

const holdScore = function () {
  score[activePlayer].textContent =
    Number(score[activePlayer].textContent) +
    Number(currentScore[activePlayer].textContent);
  currentScore[activePlayer].textContent = 0;
  currentScoreValue = 0;
  changePlayer();
  for (let i = 0; i < score.length; i++) {
    if (score[i].textContent >= 100) {
      theWin(i);
    }
  }
};

const theWin = function (i) {
  players[0].classList.remove('player--active');
  players[1].classList.remove('player--active');
  players[i].classList.add('player--winner');
  btnHoldScore.style.display = 'none';
  btnRollDice.style.display = 'none';
  dice.style.display = 'none';
  btnNewGame.style.outline = 'solid #d50b0b 3px';
};

newGame();

btnRollDice.addEventListener('click', rollDice);
btnNewGame.addEventListener('click', newGame);
btnHoldScore.addEventListener('click', holdScore);
