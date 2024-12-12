// function

/**
 * Get random number (min, max)
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// DOM ELEMENTS
const numberListElm = document.getElementById("number-list");
const countdownElm = document.getElementById("countdown");
const answersFormElm = document.getElementById("answers-form");
const inputListElm = document.getElementById("#input-list .form-control");
const instructionsElm = document.getElementById("rules");
const finalMessageElm = document.getElementById("final-message");

// numeri randomici
const randomNumbers = [];

while(randomNumbers.length < 5) {
    const number = getRndInteger(1, 100);
    if(!randomNumbers.includes(number)) {
        randomNumbers.push(number);
    }
}
console.log(randomNumbers);

// numeri in pagina
let numberList = '';
for(let i = 0; i < randomNumbers.length; i++) {
    numberList += `<li>${randomNumbers[i]}</li>`;
}

numberListElm.innerHTML =numberList;

// countdown
let timer = 5;

countdownElm.innerHTML = timer;

const intervalID = setInterval(function() {
    timer--;
    countdownElm.innerHTML = timer;
    if(timer === 0) {
        clearInterval(intervalID) ;
        numberListElm.classList.add("d-none");
        answersFormElm.classList.remove("d-none");
        instructionsElm.innerHTML = "Inserisci tutti i numeri visti prima!!";
    }
}, 1000);

// DOM EVENTS
answersFormElm.addEventListener("submit", function(event) {
    event.preventDefault();

    const userNumbers = [];
    for(let i = 0; i < inputListElm.length; i++) {
        const inputValue = Number(inputListElm[i].value);
        userNumbers.push(inputValue);
    }

    // numeri indovinati
    const userGuesses = [];
    for (let i = 0; i < userNumbers.length; i++) {
        const number = userNumbers[i];
        if(randomNumbers.includes(number)) {
            userGuesses.push(number)
        }
    }

    if(userGuesses.length === 0) {
        finalMessageElm.innerHTML = "Hai perso, riprova!"
    } else {
        finalMessageElm.innerHTML = `Bravo!!! numeri indovinati: ${userGuesses}.`
        finalMessageElm.classList.remove("text-danger")
        finalMessageElm.classList.add("text-success")
    }
});