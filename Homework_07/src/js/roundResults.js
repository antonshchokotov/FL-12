export {draw, win, loose, clearGame};

let scoreUser = 0;
let scoreComputer = 0;

function draw(userWeapon, computerWeapon) {
  let log = document.getElementsByClassName('game')[0];
  log.innerHTML = `<p style="background-color: lightgrey">${userWeapon} vs. ${computerWeapon} -> it's a draw!</p>` + log.innerHTML;
}

function win(userWeapon, computerWeapon) {
  let log = document.getElementsByClassName('game')[0];
  log.innerHTML = `<p style="background-color: lightgreen">${userWeapon} vs. ${computerWeapon} -> You've WON the round!</p>` + log.innerHTML;
  if (++scoreUser === 3) {
    log.innerHTML = `<p style="background-color: rgb(0, 255, 0); font-size: 28px"><b>You've WON the game!</b></p>` + log.innerHTML;
    disableButtons();
  } 
}

function loose(userWeapon, computerWeapon) {
  let log = document.getElementsByClassName('game')[0];
  log.innerHTML = `<p style="background-color: pink">${userWeapon} vs. ${computerWeapon} -> You've LOST the round!</p>` + log.innerHTML;
  if (++scoreComputer === 3) {
    log.innerHTML = `<p style="background-color: rgba(255, 0, 0, 1); font-size: 28px"><b>You've LOST the game!</b></p>` + log.innerHTML;
    disableButtons();
  } 
}

function clearGame() {
  document.getElementsByClassName('game')[0].innerHTML = '';
  scoreUser = 0;
  scoreComputer = 0;
  enableButtons();
}

function disableButtons() {
  [...document.getElementsByTagName('button')].forEach(el => {
    el.disabled = true;
    scoreUser === 3
      ? el.classList.add('gamewin')
      : el.classList.add('gameover');
  });
}

function enableButtons() {
  [...document.getElementsByTagName('button')].forEach(el => {
    el.disabled = false;
    el.classList.remove('gameover');
    el.classList.remove('gamewin');
  });
}