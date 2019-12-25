let game;
confirm('Do you want to play a game?') ? game = true : alert('You did not become a billionaire, but can.');

if (game) {
  const INITIAL_RANDOM_RANGE = 8;
  const INITIAL_FIRST_ATTEMPT_WIN = 100;
  const INITIAL_SECOND_ATTEMPT_WIN = 50;
  const INITIAL_THIRD_ATTEMPT_WIN = 25;
  const RANGE_INCREMENT = 4;
  const PRIZE_INCREMENT = 2;
  const INITIAL_PRIZE_VALUE = 0;
  let maxRandomNumber = INITIAL_RANDOM_RANGE;
  let firstAttemptWin = INITIAL_FIRST_ATTEMPT_WIN;
  let secondAttemptWin = INITIAL_SECOND_ATTEMPT_WIN;
  let thirdAttemptWin = INITIAL_THIRD_ATTEMPT_WIN;
  let prize = INITIAL_PRIZE_VALUE;
  let userBet;

  // overall game until user quit
  while (game) {
    let gameFinished = false;
    let attempts = 3;
    let prizeValues = [thirdAttemptWin, secondAttemptWin, firstAttemptWin];
    let pocketNumber = Math.floor(Math.random()*(maxRandomNumber+1));

    // one level of the game with 3 attempts
    while (attempts) {
      userBet = parseInt(prompt(`Choose a roulette pocket number from 0 to ${maxRandomNumber}
Attempts left: ${attempts--}
Total prize: $${prize}
Possible prize on current attempt: $${prizeValues[attempts]}`));    
      if (userBet === pocketNumber) {
        prize += prizeValues[attempts];
        let nextLevel = confirm(`Congratulation, you won! Your prize is: $${prize}. Do you want to continue?`); 
        if (nextLevel) {
          maxRandomNumber += RANGE_INCREMENT;
          firstAttemptWin *= PRIZE_INCREMENT;
          secondAttemptWin *= PRIZE_INCREMENT;
          thirdAttemptWin *= PRIZE_INCREMENT;
        } else {
          gameFinished = true;
        }
        break;
      } else if (attempts === 0) {
        gameFinished = true;
      }
    }
  
    // ask user to start over if they lost (used all 3 attempts) or decided not to continue after win
    if (gameFinished) {
      alert(`Thank you for your participation. Your prize is: $${prize}`);
      game = confirm('Do you want to play again?');
      if (game) {
        maxRandomNumber = INITIAL_RANDOM_RANGE;
        firstAttemptWin = INITIAL_FIRST_ATTEMPT_WIN;
        secondAttemptWin = INITIAL_SECOND_ATTEMPT_WIN;
        thirdAttemptWin = INITIAL_THIRD_ATTEMPT_WIN;
        prize = INITIAL_PRIZE_VALUE;
      }
    }
  }
}