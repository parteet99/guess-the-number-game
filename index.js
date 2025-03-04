let randomNum = parseInt(Math.random() * 100 + 1)

const submit = document.querySelector('#subt')
const userInput = document.querySelector('#guessField')
const guessSlot = document.querySelector('.guesses')
const remaining = document.querySelector('.lastResult')
const lowOrHi = document.querySelector('.lowOrHi')
const startOver = document.querySelector('.resultParas')

const p = document.createElement('p')

let prevGuess = []  //to show user previous guesses so they cannot use same numbers
let numOfGuess = 1  //initial value is 1

let playGame = true


// if condition is true then it will allow user input the value
if (playGame) { 
   submit.addEventListener('click', function (e) {
      e.preventDefault()
      const guess = parseInt(userInput.value)
      // console.log(guess);
      validateGuess(guess)   //pass inserted value to validateGuess() function
   })
}


function validateGuess(guess) {
   // validation for unwanted values
   if (isNaN(guess)) {
      alert('Please enter a valid number')
   } else if (guess < 1) {
      alert('Please enter number greater than 1')
   } else if (guess > 100) {
      alert('Please enter number less than 100')
   } else {
      prevGuess.push(guess)    //to display number of guesses to player
      if (numOfGuess === 10) {
         displayGuess(guess)
         displayMessage(`Game Over! Random number was ${randomNum}`)
         endGame()
      } else {
         displayGuess(guess)
         checkGuess(guess)
      }
   }
}

function checkGuess(guess){
   //check guess if value is higher, lower or equal to guess value
   if (guess === randomNum) {
      displayMessage(`You guessed it right!!!!`)
      endGame()
   } else if (guess < randomNum) {
      displayMessage(`Number is too low`)
   } else if (guess > randomNum) {
      displayMessage(`Number is too high`)
   }
}

function displayGuess(guess) {
   userInput.value = ''  
   guessSlot.innerHTML += `${guess}, `
   numOfGuess++
   remaining.innerHTML = `${10 - numOfGuess}`
}

function displayMessage(message) {
   // display all messages
   lowOrHi.innerHTML = `<h2>${message}</h2>`
}


function endGame() {
   // end  game
   userInput.value = ''
   userInput.setAttribute('disabled', '')
   p.classList.add('button')
   p.innerHTML = `<h2 id="newGame" style="cursor:pointer;">Start New Game</h2>`
   startOver.appendChild(p)
   playGame = false
   newGame()
}

function newGame() {
   // start new game
   const newGameButton = document.querySelector('#newGame')
   newGameButton.addEventListener('click', function (e) {
      randomNum = parseInt(Math.random() * 100 + 1)
      prevGuess = []
      numOfGuess = 1
      guessSlot.innerHTML = ``
      remaining.innerHTML = `${11 - numOfGuess}`
      userInput.removeAttribute('disabled')
      startOver.removeChild(p)
      displayMessage(``)

      playGame = true
   })
}  


