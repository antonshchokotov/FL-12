class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
    Object.defineProperty(this, 'isFaceCard', {
      value: (this.rank < 2 || this.rank > 10) ? true : false,
      writable: false,
    });
  }

  toString() {
    let cardName = '';
    if (this.isFaceCard) {
      switch (this.rank) {
        case 1:
          cardName = 'Ace';
          break;
        case 11:
          cardName = 'Jack';
          break;
        case 12:
          cardName = 'Queen';
          break;
        case 13:
          cardName = 'King';
          break;
        default:
          throw new Error('The card rank is not valid');
      }
    } else {
      cardName = this.rank;
    }
    return `${cardName} of ${this.suit}`;
  }
}

Card.compare = (cardOne, cardTwo) => {
  return cardOne.rank > cardTwo.rank
      ? 1
      : cardOne.rank < cardTwo.rank
          ? 2
          : 0;
}

class Deck {
  constructor() {
    this.cards = (() => {
      let allCards = [];
      for (let suit of ['Hearts', 'Diamonds', 'Clubs', 'Spades']) {
        for (let rank = 1; rank <= 13; rank++) {
          let card = new Card(suit, rank);
          allCards.push(card);
        }
      }
      return allCards;
    })();
    this.count = 52;
  }

  shuffle() {
    this.cards.sort(() => Math.random() - 0.5);
  }

  draw(n) {
    return this.cards.splice(this.count -= n);
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.wins = 0;
    this.deck = new Deck();
    this.deck.shuffle();
  }
}

function play(playerOne, playerTwo) {
  while (playerOne.deck.count) {
    let roundResult = Card
        .compare(playerOne.deck.draw(1)[0], playerTwo.deck.draw(1)[0]);
    switch (roundResult) {
      case 0:
        break;
      case 1:
        playerOne.wins++;
        break;
      case 2:
        playerTwo.wins++;
        break;
      default:
        throw new Error('Something went wrong');
    }
  }

  if (playerOne.wins === playerTwo.wins) {
    console.log(`Game finished. It's a Draw!`);
  } else {
    let gameResult = playerOne.wins > playerTwo.wins
        ? `${playerOne.name} wins ${playerOne.wins} to ${playerTwo.wins}`
        : `${playerTwo.name} wins ${playerTwo.wins} to ${playerOne.wins}`;
    console.log(gameResult);
  }

  playerOne.deck = new Deck();
  playerOne.deck.shuffle();
  playerOne.wins = 0;
  playerTwo.deck = new Deck();
  playerTwo.deck.shuffle();
  playerTwo.wins = 0;

}



let A = new Player('Anton');
let O = new Player('Olena');

play(A,O);
play(A,O);
play(A,O);
play(A,O);
play(A,O);
play(A,O);
play(A,O);
play(A,O);