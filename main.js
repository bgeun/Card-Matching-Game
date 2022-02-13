const clicks = document.querySelector(".move");
const timer = document.querySelector(".time");
const cards = document.querySelectorAll(".card");
let firstCard;
let secondCard;
let hasFlipped = false;
let lockBoard = false;
let move = 0;
let pair = 0;
let minute = 0;
let seconds = 0;
let interval;
// -------------------------------------------------------------------

// 카드 보여주기
window.onload = () => {
  Array.from(cards).map((v) => {
    v.classList.add("flip");
    setTimeout(() => {
      v.classList.remove("flip");
    }, 800);
  });
};

function flipCard() {
  move++;
  clicks.innerHTML = move;
  if (move == 1) {
    startCounter();
  }
  if (lockBoard) return;
  if (firstCard === this) return;
  this.classList.add("flip");

  if (!hasFlipped) {
    firstCard = this;
    hasFlipped = true;
    return;
  }
  secondCard = this;
  lockBoard = true;
  isMatch();
}

function isMatch() {
  let match = firstCard.dataset.tech === secondCard.dataset.tech;
  if (match) {
    disableCards();
  } else {
    unflipCard();
  }
}

function disableCards() {
  pair++;
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  if (pair === 6) {
    endGame();
  }
  resetBoard();
}

function unflipCard() {
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 500);
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  hasFlipped = false;
  lockBoard = false;
}

(function shuffleCards() {
  cards.forEach((card) => {
    let position = Math.floor(Math.random() * 12);
    card.style.order = position;
  });
})();

function endGame() {
  stopTimer();
  alert(` 게임 끝! 클릭 ${move}번  ${minute}분 ${seconds}초`);
}

function startCounter() {
  interval = setInterval(() => {
    timer.innerHTML = minute + "min" + seconds + "sec";
    seconds++;
    if (seconds === 60) {
      minute++;
      seconds = 0;
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
}

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});
