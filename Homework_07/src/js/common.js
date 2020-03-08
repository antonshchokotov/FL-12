import {draw, win, loose, clearGame} from './roundResults.js';

const weapons = ['rock', 'paper', 'scissors'];
const results = [
  ['d', 'u', 'c'],
  ['c', 'd', 'u'],
  ['u', 'c', 'd'],
  ];

function play(userWeapon) {
  const computerWeapon = Math.floor(Math.random() * 3);
  const result = results[computerWeapon][userWeapon];
  switch (result) {
    case 'd':
      draw(weapons[userWeapon], weapons[computerWeapon]);
      break;
    case 'c':
      loose(weapons[userWeapon], weapons[computerWeapon]);
      break;
    case 'u':
      win(weapons[userWeapon], weapons[computerWeapon]);
      break;
    default:
      throw new Error('something went wrong');
  }
}

document.getElementsByClassName('button-rock')[0].addEventListener('click', () => play(0));
document.getElementsByClassName('button-paper')[0].addEventListener('click', () => play(1));
document.getElementsByClassName('button-scissors')[0].addEventListener('click', () => play(2));
document.getElementsByClassName('reset')[0].addEventListener('click', clearGame);