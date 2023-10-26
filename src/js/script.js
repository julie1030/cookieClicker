
// Import our custom CSS
import '../scss/style.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

var buttonClick = document.getElementById("buttonClick")
var scoreView = document.getElementById("scoreView")
var multiplyView = document.getElementById("multiplierView")

const multiplier2 = document.getElementById("multiplier2");
const multiplier5= document.getElementById("multiplier5");
const multiplier10 = document.getElementById("multiplier10");
const multiplier30 = document.getElementById("multiplier30");

const price2 = document.getElementById("price2");
const price5 = document.getElementById("price5");
const price10 = document.getElementById("price10");
const price30 = document.getElementById("price30");

const register = []

const rules = [
  { multi: 2, price: 30 },
  { multi: 5, price: 100 },
  { multi: 10, price: 500 },
  { multi: 20, price: 10000 }
]

let score = 0
// let lastMultiplier

function getIncrease () {
// le score augmente apres chaque achat sans perdre les achats précédents
  let total = 1
  register.forEach(value => total *= value)

  return total
}

function getPrice (multiplier) {
  // le prix augmente a chaque achat d'un meme multiplier
  const priceIncrease = register.filter(value => {
  return value === multiplier
  }).length || 0

  // on cherche le prix du multiplier dans les rules
  const rule = rules.find(rule => rule.multi === multiplier)

  // prix calculé: on multiplie le prix de base par le nombre d'achats précédents
  const currentPrice = rule?.price * (priceIncrease + 1) || 0

  return currentPrice
}

function updateDisplay() {
  scoreView.textContent = score
  multiplyView.textContent = `Multiply ${getIncrease()}`

  // logiaue pour activer les boutons
  multiplier2.disabled = score < getPrice(2)
  multiplier5.disabled = score < getPrice(5)
  multiplier10.disabled = score < getPrice(10)
  multiplier30.disabled = score < getPrice(20)

  // affichage des prix
  price2.textContent = getPrice(2)
  price5.textContent = getPrice(5)
  price10.textContent = getPrice(10)
  price30.textContent = getPrice(20)
}

var increaseScore = function () {
  score = score + getIncrease()
  updateDisplay()
}

function buyMultiplier(multiplier) {
  const currentPrice = getPrice(multiplier)
  // si on a les moyens, acheter un multiplier
  if (score >= currentPrice) {
    // on veut garder une trace de chaque achat
    register.push(multiplier)
    score = score - currentPrice
    // lastMultiplier = multiplier
  }
  updateDisplay()
}

// Affichage initial
updateDisplay()

buttonClick.addEventListener("click", increaseScore)


let bonusActive = false
const bonusCost = 200 // Coût du bonus
const bonusDuration = 30 // Durée du bonus en secondes

// Cette fonction doit être appelée lorsqu'un bouton est activé
function activateBonus() {
  purchaseBonus()
}

// Fonction pour acheter un bonus temporaire
function purchaseBonus() {
  const bonusButton = document.getElementById("bonusButton")

  if (score >= bonusCost && !bonusActive) {
    score -= bonusCost
    score.innerText = scoreView
    bonusActive = true
    bonusButton.disabled = true // Désactiver le bouton pendant la durée du bonus
    setTimeout(() => {
      bonusActive = false
      bonusButton.disabled = false // Réactiver le bouton après la fin du bonus
    }, bonusDuration * 1000)
    let scoreUpdateInterval = setInterval(() => {
      if (bonusActive) {
        score += score * 2 // Score doublé
        pointsElement.innerText = score // Mettre à jour l'affichage du score
      } else {
        clearInterval(scoreUpdateInterval) // Arrêter la mise à jour du score lorsque le bonus est terminé
      }
    }, 1000)
  } else {
    bonusButton.disabled = true // Désactiver le bouton si le joueur n'a pas suffisamment de points
  }
}

let autoclicks = 0;
let coutDeBaseAutoClick = 10;


function autoclick() {
  score += autoclicks
  updateScore()
}

const autoclickInterval = setInterval(autoclick, 1000)

function updateScore() {
  const scoreView = document.getElementById("scoreView")
  scoreView.textContent = score
}

function acheterAutoClick() {
  const coutAutoClickActuel = coutDeBaseAutoClick + (10 * autoclicks);
  if (score >= coutAutoClickActuel) {
    score -= coutAutoClickActuel;
    autoclicks++;
    const autoclickPriceElement = document.getElementById("autoClickButton");
    autoclickPriceElement.textContent = (coutAutoClickActuel + 10) + " punaises";
    updateAutoclickCount();
    updateScore();
    alert("Vous avez acheté un auto-clic")
  } else {
    alert("Vous n'avez pas assez d'argent.")
  }
}

const autoClickButton = document.getElementById("autoClickButton")
autoClickButton.addEventListener("click", acheterAutoClick)
multiplier2.addEventListener("click", () => buyMultiplier(2));
multiplier5.addEventListener("click", () => buyMultiplier(5));
multiplier10.addEventListener("click", () => buyMultiplier(10));
multiplier30.addEventListener("click", () => buyMultiplier(30));

const Bonus = document.getElementById("bonusButton")

Bonus.addEventListener("click", () => activateBonus(purchaseBonus()))

function updateAutoclickCount() {
  const autoclickCount = document.getElementById("autoclickCount")
  autoclickCount.textContent = "Nombre d'autoclicks : " + autoclicks
}

