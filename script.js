var buttonClick = document.getElementById("buttonClick");

var scoreView = document.getElementById("scoreView");
var multiplyView = document.getElementById("multiplierView");


const rules = [
  { multi: 1, price: 30}, 
  { multi: 2, price: 100}, 
  { multi: 5, price: 500 }, 
  { multi: 10, price: 1000}, 
  { multi: 30, price: 100000}
]
  
var score = 0;
let autoclicks = 0;
var currentIndex = 0;

function display () {
  scoreView.textContent = score;
  multiplyView.textContent = `Multiply x${rules[currentIndex].multi}` 
}          

var increaseScore = function () {
  score = score + rules[currentIndex].multi;
  display()
}

function multiplier () {
 const currentPrice = rules[currentIndex].price

  if (score >= currentPrice) {
    currentIndex += 1
    score = score - currentPrice
    display()
  }
}

display()

buttonClick.addEventListener("click", increaseScore);
// multiplyButton.addEventListener("click", multiplier);

let bonusActive = false;
const bonusCost = 200; // Coût du bonus
const bonusDuration = 30; // Durée du bonus en secondes

// Cette fonction doit être appelée lorsqu'un bouton est activé
function activateBonus() {
  purchaseBonus();
}

// Fonction pour acheter un bonus temporaire
function purchaseBonus() {
  const pointsElement = document.getElementById("points");
  const bonusButton = document.getElementById("bonusButton");

  if (score >= bonusCost && !bonusActive) {
    score -= bonusCost;
    pointsElement.innerText = playerPoints;
    bonusActive = true;
    bonusButton.disabled = true; // Désactiver le bouton pendant la durée du bonus
    setTimeout(() => {
      bonusActive = false;
      bonusButton.disabled = false; // Réactiver le bouton après la fin du bonus
    }, bonusDuration * 1000);
  } else {
    bonusButton.disabled = true; // Désactiver le bouton si le joueur n'a pas suffisamment de points
  }
}

function autoclick() {
  score += autoclicks; 
  updateScore(); 
}

const autoclickInterval = setInterval(autoclick, 1000);

function updateScore() {
  const scoreView = document.getElementById("scoreView");
  scoreView.textContent = score;
}

function acheterAutoClick() {
  const prixAutoClick = 10; 
  if (score >= prixAutoClick) {
    score -= prixAutoClick;
    autoclicks++;
    updateAutoclickCount();
    updateScore();
  } else {
    alert("Vous n'avez pas assez d'argent.");
  }
}

const autoClickButton = document.getElementById("autoClickButton");
autoClickButton.addEventListener("click", acheterAutoClick);

const multiplier2 = document.getElementById("multiplier2");
const multiplier5= document.getElementById("multiplier5");
const multiplier10 = document.getElementById("multiplier10");
const multiplier30 = document.getElementById("multiplier30");
multiplier2.addEventListener("click", () => multiplier(2));
multiplier5.addEventListener("click", () => multiplier(5));
multiplier10.addEventListener("click", () => multiplier(10));
multiplier30.addEventListener("click", () => multiplier(30));

function updateAutoclickCount() {
  const autoclickCount = document.getElementById("autoclickCount");
  autoclickCount.textContent = "Nombre d'autoclicks : " + autoclicks;
}
