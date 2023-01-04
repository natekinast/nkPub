import { WORDS } from "../../../Word Game/words.js"

const letters = ["A", "A", "B", "C", "D", "E", "E", "F", "G", "H", "I", "I", "J", "K", "L", "M", "N", "O", "O", "P", "Q", "R", "S", "T", "U", "U", "V", "W", "X", "Y", "Z"];
const letterDivs = [...document.querySelectorAll('.letter')];
const messages = document.getElementById('messages');
const input = document.getElementById('enter-guess');
const submit = document.getElementById('check-word');

input.addEventListener('keyup', (event) => {
  if (event.key === "Enter") submit.click();
});

function isOnScreen(word) {
  let lettersInWord = input.value.split('');
  // console.log(lettersInWord)
  let lettersOnScreen = letterDivs
    .filter(div => div.textContent !== "")
    .map(div => div.textContent.toLowerCase());
  // console.log(lettersOnScreen);

  if (lettersOnScreen.length < 5) return false;

  for (let i = 0; i < 5; i++) {
    let checkLetter = lettersInWord[i];
    if (!lettersOnScreen.includes(checkLetter)) {
      return false
    } else {
      lettersOnScreen.splice(lettersOnScreen.indexOf(checkLetter), 1);
    }
  }

  return true;
}

function genLetter() {
  return letters[Math.floor(Math.random() * letters.length)]
}

function addLetter() {
  for (let div of letterDivs) {
    if (div.textContent === "") {
      div.textContent = genLetter()
      break;
    }
  }
}

function removeWord(word) {
  let currentLetters = letterDivs.map(ele => ele.textContent)
  let remLetters = word.split('');
  
  remLetters.forEach(letter => {
    // console.log(letter);
    currentLetters.splice(currentLetters.indexOf(letter.toUpperCase()), 1)
    currentLetters.push('');
    // console.log(currentLetters)
  })

  for (let i = 0; i < currentLetters.length; i++) {
    letterDivs[i].textContent = currentLetters[i]
  }
}

function checkWord() {
  submit.disabled = true;
  let testWord = input.value;
  // console.log(testWord);
  let message;
  if (!isOnScreen(testWord)) {
    message = "Not on screen!";
  } else if (!WORDS.includes(testWord)) {
    message = "Not in dictionary!";
  } else {
    message = "Word found!";
  }
  messages.style.display = "flex";
  messages.textContent = message;
  setTimeout(()=>{
    messages.style.display = "none";
    if(message === "Word found!") removeWord(testWord);
    input.value = '';
    submit.disabled = false;
  }, 1000)
}

function clickFn(a) {
  switch (a.target.id) {
    case "new-letter":
      addLetter();
      break;
    case "check-word":
      checkWord();
      break;
  }
}

document.addEventListener("click", clickFn);




