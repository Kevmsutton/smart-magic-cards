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

// clear the cards wrapper then randomly shuffle the cards and then show them after they have been shuffled
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

//hide/show cards dependent on current state
show = () => {
  const hideCards = document.querySelector('.cards-wrapper');
  hideCards.classList.toggle('hidden');
};

// clear the cardsWrapper and then sort the cards by value 1 through 13 for each suit
// call function creating a new bonus button for reverse magic
magic = () => {
  cardsWrapper.innerHTML = '';
  state.cards.sort((cardA, cardB) => (cardA.value > cardB.value ? 1 : -1));
  generateCards();
  createReverseMagicButton();
};

createReverseMagicButton = () => {
  if (document.getElementById('reverseMagic')) {
  } else {
    const btnWrapper = document.querySelector('.btn-wrapper');
    const extraButtonElement = document.createElement('button');
    extraButtonElement.innerHTML = 'Reverse Magic';
    extraButtonElement.setAttribute('id', 'reverseMagic');
    extraButtonElement.classList.add('btn', 'btn-lg', 'bg-secondary');
    btnWrapper.append(extraButtonElement);
    document
      .getElementById('reverseMagic')
      .addEventListener('click', reverseMagic);
  }
};

reverseMagic = () => {
  for (let i = 0; i < state.cards.length - 1; i++) {
    state.cards.splice(i, 0, state.cards.pop());
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
