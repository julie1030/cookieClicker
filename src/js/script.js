// Import our custom CSS
import "../scss/style.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";

// Variables
var buttonClick = document.getElementById("buttonClick");
var scoreView = document.getElementById("scoreView");
var multiplyView = document.getElementById("multiplierView");

// Multipliers and their corresponding prices
const multiplier2 = document.getElementById("multiplier2");
const multiplier5 = document.getElementById("multiplier5");
const multiplier10 = document.getElementById("multiplier10");
const multiplier30 = document.getElementById("multiplier30");

const price2 = document.getElementById("price2");
const price5 = document.getElementById("price5");
const price10 = document.getElementById("price10");
const price30 = document.getElementById("price30");

// Register to keep track of purchases
const register = [];

// Rules for multipliers and their prices
const rules = [
  { multi: 2, price: 30 },
  { multi: 5, price: 100 },
  { multi: 10, price: 500 },
  { multi: 20, price: 10000 },
];

// Initial score
let score = 0;

// all Functions
function getIncrease() {
  let total = 1;
  register.forEach(value => (total *= value));
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
  multiplier10.disabled = score < getPrice(10);
  multiplier30.disabled = score < getPrice(20);

  price2.textContent = getPrice(2);
  price5.textContent = getPrice(5);
  price10.textContent = getPrice(10);
  price30.textContent = getPrice(20);
}

var increaseScore = function () {
  score += getIncrease();
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
const bonusCost = 200; // Cost of the bonus
const bonusDuration = 30; // Duration of the bonus in seconds

function activateBonus() {
  if (!bonusActive) {
    if (score >= bonusCost) {
      score -= bonusCost;
      bonusActive = true;
      setTimeout(() => {
        bonusActive = false;
      }, bonusDuration * 1000);
      updateDisplay();
    } else {
      alert("Not enough score to activate the bonus.");
    }
  } else {
    alert("Bonus is already active.");
  }
}

const bonusButton = document.getElementById("bonusButton");
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
    updateAutoclickCount();
    updateScore();
    alert("You have purchased an autoclick.");
  } else {
    alert("Not enough score to buy an autoclick.");
  }
}

const autoclickButton = document.getElementById("autoClickButton");
autoclickButton.addEventListener("click", buyAutoclick);

function updateAutoclickCount() {
  const autoclickCount = document.getElementById("autoclickCount");
  autoclickCount.textContent = "Autoclicks: " + autoclicks;
}

// Event listeners for multipliers
multiplier2.addEventListener("click", () => buyMultiplier(2));
multiplier5.addEventListener("click", () => buyMultiplier(5));
multiplier10.addEventListener("click", () => buyMultiplier(10));
multiplier30.addEventListener("click", () => buyMultiplier(20));
