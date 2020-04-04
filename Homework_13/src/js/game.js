import { cells, combinations, checkWin } from './checkWins';

const newGameButton = document.getElementById('newGameButton');
const newRoundButton = document.getElementById('newRoundButton');
const board = document.getElementById('board');
const stats_player1_name = document.getElementById('player1__name');
const stats_player2_name = document.getElementById('player2__name');
const stats_player1_score = document.getElementById('player1__score'); 
const stats_player2_score = document.getElementById('player2__score'); 
const stats_player1 = document.getElementById('stats_player1');
const stats_player2 = document.getElementById('stats_player2');
const message = document.getElementById('message');


// app state

let player1 = '';
let player2 = '';
let currentTurn = null;
let player1Score = 0;
let player2Score = 0;
let turnsCounter = 0;



newGameButton.addEventListener('click', newGame);

function newGame() {
  getUsernames();
  showUserNames();
  clearBoard();

  board.addEventListener('click', handleClick);

  
  stats_player1.classList.remove('current-player');
  stats_player2.classList.remove('current-player');

  player1Score = 0;
  player2Score = 0;

  stats_player1_score.textContent = player1Score;
  stats_player2_score.textContent = player2Score;

  currentTurn = Math.floor(Math.random()*2) === 1;
  if (currentTurn) {
    board.classList.add('x');
    stats_player1.classList.add('current-player');
  } else {
    board.classList.add('o');
    stats_player2.classList.add('current-player');
  }
}

newRoundButton.addEventListener('click', newRound);

function newRound() {

  clearBoard();

  board.addEventListener('click', handleClick);

  stats_player1.classList.remove('current-player');
  stats_player2.classList.remove('current-player');

  currentTurn = Math.floor(Math.random()*2) === 1;
  if (currentTurn) {
    board.classList.add('x');
    stats_player1.classList.add('current-player');
  } else {
    board.classList.add('o');
    stats_player2.classList.add('current-player');
  }
}


function getUsernames() {
  player1 = document.getElementById('player1').value;
  player2 = document.getElementById('player2').value;
}

function showUserNames() {
  stats_player1_name.textContent = player1;
  stats_player2_name.textContent = player2;
}

function handleTurn() {
  board.classList.toggle('o');
  board.classList.toggle('x');
  stats_player1.classList.toggle('current-player');
  stats_player2.classList.toggle('current-player');
}


// board methods

function clearBoard() {
  board.className = 'board';
  cells.forEach(cell => cell.className = 'cell');
  message.textContent = '';
}


function handleClick(e) {

    if (e.target.classList.contains('x') || e.target.classList.contains('o')) {
      return
    }

    turnsCounter++;

    if (currentTurn) {
      board.classList.remove('x');
      board.classList.add('o');
      e.target.classList.add('x');
      if (checkWin('x')) {
        message.textContent = `${player1} wins`;
        markWin('x');
        addScore('x');
        board.removeEventListener('click', handleClick);
        turnsCounter = 0;
        return
      }
    } else {
      board.classList.remove('o');
      board.classList.add('x');
      e.target.classList.add('o');
      if (checkWin('o')) {
        message.textContent = `${player2} wins`;
        markWin('o');
        addScore('o');
        board.removeEventListener('click', handleClick);
        turnsCounter = 0;
        return
      }
    }

    checkDraw();

    stats_player1.classList.toggle('current-player');
    stats_player2.classList.toggle('current-player');

    currentTurn = !currentTurn;

}


function checkDraw() {
  if (turnsCounter === 9) {
    message.textContent = `it's a draw!`;
    board.removeEventListener('click', handleClick);
    addScore('x');
    addScore('o');
    turnsCounter = 0;
  }
}

function markWin(currentClass) {
  for (let combination of combinations) {
    if (combination.every(i=>cells[i].classList.contains(currentClass))) {
      combination.forEach(i => cells[i].classList.add('win'))
    }
  }
}

function addScore(x) {
  x === 'x'
    ? player1Score++
    : player2Score++
  stats_player1_score.textContent = player1Score;
  stats_player2_score.textContent = player2Score;
}