// Import our custom CSS
import "../scss/style.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

// Variables
var buttonClick = document.getElementById("buttonClick");
var scoreView = document.getElementById("scoreView");
var multiplyView = document.getElementById("multiplierView");

const multiplier2 = document.getElementById("multiplier2");
const multiplier5 = document.getElementById("multiplier5");
const bonusButton = document.getElementById("bonusButton");
const autoClickButton = document.getElementById("autoClickButton");

const price2 = document.getElementById("price2");
const price5 = document.getElementById("price5");

const bonusPrice = document.getElementById("bonusPrice");
const autoclickPrice = document.getElementById("autoclickPrice");

// Register to keep track of purchases
const register = [];

// Rules for multipliers and their prices
const rules = [
  { multi: 2, price: 30 },
  { multi: 5, price: 100 },
  { multi: "bonus", price: 1000 },
  { multi: "autoclick", price: 10 },
];

// Initial score
let score = 0;

// all Functions
function getIncrease() {
  let total = 1;
  register.forEach(value => {
    if(typeof(value) === "number") {
      return (total *= value)
    }
    return 2
  });
  return total;
}

function getPrice(multiplier) {
  const priceIncrease =
    register.filter(value => value === multiplier).length || 0;
  const rule = rules.find(rule => rule.multi === multiplier);
  const currentPrice = rule ? rule.price * (priceIncrease + 1) : 0;
  return currentPrice;
}

function updateDisplay() {
  scoreView.textContent = score;
  multiplyView.textContent = `Multiply ${getIncrease()}`;

  multiplier2.disabled = score < getPrice(2);
  multiplier5.disabled = score < getPrice(5);
  bonusButton.disabled = score < getPrice("bonus");
  autoClickButton.disabled = score < getPrice("autoclick");

  price2.textContent = getPrice(2);
  price5.textContent = getPrice(5);
  bonusPrice.textContent = getPrice("bonus");
  autoclickPrice.textContent = getPrice("autoclick");
}

var increaseScore = function () {
  score += getIncrease();

  if (bonusActive) {
    const scoreBonus = calculateScoreBonus();
    score = scoreBonus
  }

  updateDisplay();
};

function buyMultiplier(multiplier) {
  const currentPrice = getPrice(multiplier);
  if (score >= currentPrice) {
    register.push(multiplier);
    score -= currentPrice;
  }
  updateDisplay();
}

// Initial display update
updateDisplay();

// Event listeners
buttonClick.addEventListener("click", increaseScore);

// Bonus functionality
let bonusActive = false;
const bonusCost = 20; // Cost of the bonus
const bonusDuration = 5000; // Duration of the bonus in milliseconds

function activateBonus() {
  if (!bonusActive) {
    register.push("bonus");

    applyScoreBonus();
  }
}

function applyScoreBonus() {
  if (score >= bonusCost) {
    decreaseScoreByBonusCost();
    activateBonusEffect();
    setBonusTimeout();
    updateDisplay();
  }
}

function calculateScoreBonus() {
  return score * 2;
}

function decreaseScoreByBonusCost() {
  score -= bonusCost;
}

function activateBonusEffect() {
  bonusActive = true;
}

let timerCount = bonusDuration / 1000; // timeout du bonus (milliseconds to seconds)
function setBonusTimeout() {

  const stopBonus = () => {
    clearInterval(interval)
  }

  const interval = setInterval(() => {
    if (timerCount === 0) {
      document.getElementById("timer").textContent = 0

      timerCount = bonusDuration / 1000;
      stopBonus()
    }
    else {
      document.getElementById("timer").textContent = timerCount
      timerCount--;
    }
  }, 1000)

  setTimeout(() => {
    bonusActive = false;
  }, bonusDuration);
}


bonusButton.addEventListener("click", activateBonus);

// Autoclick functionality
let autoclicks = 0;
let baseAutoclickCost = 10;

function autoclick() {
  score += autoclicks;
  updateScore();
}

const autoclickInterval = setInterval(autoclick, 1000);

function updateScore() {
  scoreView.textContent = score;
}

function buyAutoclick() {
  const currentAutoclickCost = baseAutoclickCost + 10 * autoclicks;
  if (score >= currentAutoclickCost) {
    score -= currentAutoclickCost;
    autoclicks++;
    register.push("autoclick");
    updateAutoclickCount();
    updateScore();
  }
}


const autoclickButton = document.getElementById("autoClickButton");
autoclickButton.addEventListener("click", buyAutoclick);

window.onload = function() {
  const modal = document.getElementById("myModal");
  const closeButton = document.querySelector(".close");

  modal.style.display = "block";

  // Fermer la fenêtre modale lorsque l'utilisateur clique sur la croix
  closeButton.addEventListener("click", function() {
    modal.style.display = "none";
  });

  // Fermer la fenêtre modale lorsque l'utilisateur clique en dehors de la fenêtre modale
  window.addEventListener("click", function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
};


// Event listeners for multipliers
multiplier2.addEventListener("click", () => buyMultiplier(2));
multiplier5.addEventListener("click", () => buyMultiplier(5));

function updateAutoclickCount() {
  const autoclickCount = document.getElementById("autoclickCount");
  autoclickCount.textContent = "Nombre d'autoclicks : " + autoclicks;
}
