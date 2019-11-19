const suit = ['hearts', 'diamonds', 'clubs', 'spades'];
const cardsWrapper = document.querySelector('.cards-wrapper');
const btnWrapper = document.querySelector('.btn-wrapper');
const buttons = ['Shuffle', 'Show/Show', 'Magic'];

state = {
  cards: []
};

function createCards() {
  // Create an array with objects containing the value and the suit of each card
  for (let i = 1; i <= 13; i += 1) {
    for (let j = 0; j < suit.length; j++) {
      const cardObject = {
        value: i,
        suit: suit[j]
      };
      state.cards.push(cardObject);
    }
    generateCards();
  }
}

// For each dataObject, create a new card and append it to the DOM
const generateCards = () => {
  state.cards.forEach((card, i) => {
    const positionFromLeft = i * 30;
    const cardElement = document.createElement('div');
    cardElement.setAttribute('data-value', card.value);
    cardElement.classList.add(`card`, `${card.suit}-${card.value}`);
    cardElement.style.left = `${positionFromLeft}px`;
    cardsWrapper.append(cardElement);
  });
};

// Function to clear out the initial button and create new buttons to play the game.
function createButtons() {
  btnWrapper.innerHTML = '';
  buttons.forEach(button => {
    const buttonElement = document.createElement('button');
    buttonElement.innerHTML = button;
    buttonElement.classList.add('btn', 'btn-lg', 'bg-secondary');
    buttonElement.setAttribute('id', button);
    btnWrapper.append(buttonElement);
  });
  document.getElementById('Shuffle').addEventListener('click', shuffle);
  document.getElementById('Show/Show').addEventListener('click', show);
  document.getElementById('Magic').addEventListener('click', magic);
}

magic = () => {
  cardsWrapper.innerHTML = '';
  state.cards.sort((a, b) => (a.value > b.value ? 1 : -1));
  generateCards();
};

show = () => {
  cardsWrapper.innerHTML = '';
  state.cards.forEach(card => {
    hiddenCard = document.createElement('div');
    hiddenCard.innerHTML = `<p class='hiddenCard'>This is a hidden card</p>`;
    cardsWrapper.append(hiddenCard);
  });
};

shuffle = () => {
  cardsWrapper.innerHTML = '';
  for (let i = 0; i < state.cards.length; i++) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = state.cards[i];
    state.cards[i] = state.cards[j];
    state.cards[j] = temp;
  }
  generateCards();
};

// Function to start the game by clearing the wrapper, creating
// and appending the buttons and all the cards to the DOM
function startGame() {
  createButtons();
  createCards();
}

document.getElementById('start-game').addEventListener('click', startGame);
