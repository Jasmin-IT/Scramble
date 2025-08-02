const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint span");
const timeText = document.querySelector(".time b");
const inputField = document.querySelector("input");

let correctWord, timer, maxTime = 30;

const initTimer = (time) => {
    clearInterval(timer);
    maxTime = time;
    timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        clearInterval(timer);
        alert(`TIME OFF! ${correctWord.toLowerCase()} was the correct word`);
        initGame();
    }, 1000);
};

const initGame = () => {
    initTimer(30);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
    console.log(randomObj);
};
initGame();

const checkWord = () => {
    console.log("Check word button clicked");
    let userWord = inputField.value.toLowerCase();
    console.log("User word:", userWord);
    console.log("Correct word:", correctWord);
    if (!userWord) return alert("please enter a word");
    if (userWord !== correctWord) {
        return alert(`OOPS! ${userWord} is not a correct word`);
    }
    alert(`CONGRATS! ${userWord} is a correct word`);
    initGame();
};

// Adding event listeners using JavaScript for an additional check
document.querySelector(".refresh-word").addEventListener("click", initGame);
document.querySelector(".check-word").addEventListener("click", checkWord);
