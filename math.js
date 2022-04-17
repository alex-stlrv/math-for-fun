import { getRandomInt } from './support_functions/getRandom.js'; 

var addBtn = document.getElementById("add");
var subBtn = document.getElementById("subtract");
var multBtn = document.getElementById("multiply");
var divBtn = document.getElementById("divide");
var chBtn = document.getElementById("challenge");
var newGame = document.getElementById("new-game");

var firstAnsBtn = document.getElementById("first-button");
var secondAnsBtn = document.getElementById("second-button");
var thirdAnsBtn = document.getElementById("third-button");
var fourthAnsBtn = document.getElementById("fourth-button");

var bear = document.getElementById("bear-img");
var fox = document.getElementById("fox-img");
var lion = document.getElementById("lion-img");
var racoon = document.getElementById("racoon-img");
var seal = document.getElementById("seal-img");
var tiger = document.getElementById("tiger-img");
var superMouse = document.getElementById("super-mouse-img");
var superTiger = document.getElementById("super-tiger-img");
var superPanda = document.getElementById("super-panda-img");
var superSheep = document.getElementById("super-sheep-img");
var superSloath = document.getElementById("super-sloath-img");

var question = document.getElementById("math-question");
var feedback = document.getElementById("feedback-text");
var buddiesText = document.getElementById("updatable-buddies");
var winnerFeedback = document.getElementById("winner-feedback");
var scoreDisplay = document.getElementById("score-display");

const answerButtons = [firstAnsBtn, secondAnsBtn, thirdAnsBtn, fourthAnsBtn];
const imgList = [bear, fox, lion, racoon, seal, tiger, superMouse, superPanda, superSheep, superSloath, superTiger];
let gameAnswerButtons;
let gameImgList;
let gameAnswerList;
let gameAnswers;
let correctBtn;
setGameImages();
const posFeedbackList = [
    "THAT'S CORRECT! YOU ARE DOING AWESOME!",
    "THAT'S CORRECT! YOUR BUDDIES ARE PROUD OF YOU!",
    "THAT'S CORRECT! ISN'T MATH FUN?!",
    "THAT'S CORRECT! YOU ARE SO GOOD AT THIS!",
    "THAT'S CORRECT! YOU ARE TOO SMART FOR THIS GAME!",
    "THAT'S CORRECT! THAT WAS GREAT!",
    "THAT'S CORRECT! YOU ARE DOING GREAT! DOING FORGET TO GIVE YOUR EYES A BREAK!"
];
const negFeedbackList = [
    "THAT WASN'T THE RIGHT ONE... YOU'LL GET IT NEXT TIME!",
    "THAT WASN'T THE RIGHT ONE... THAT'S JUST SOME BAD LUCK!",
    "THAT WASN'T THE RIGHT ONE... OOOPS! LET'S GET THE NEXT ONE!",
    "THAT WASN'T THE RIGHT ONE... REMEMBER, YOUR BUDDIES ARE ALWAYS PROUD OF YOU!",
    "THAT WASN'T THE RIGHT ONE... THERE IS NO SHAME IN TRYING AGAIN!"
];

let btnListener = false;
let runningCorrect = 0;
let maxCorrect = 0;
let receivedBuddies = 1;
let trial = 0;

function setGameImages (newGame = true) {
    if (newGame === true) {
        gameImgList = [...imgList];
        gameImgList = gameImgList.sort(() => Math.random() - 0.5);
    } 
    const showImage = gameImgList.pop();
    showImage.style.visibility = "visible";
}

function displayAnswers (start, end, pos, deletes, insertResponse = false, correctResponse = 0) {
    gameAnswerList = [...Array(end - start + 1).keys()].map(x => x + start);
    gameAnswerList = gameAnswerList.sort(() => Math.random() - 0.5);
    gameAnswers = gameAnswerList.splice(pos, deletes);
    if (insertResponse === true) {
        gameAnswers.unshift(correctResponse);
        gameAnswers = [...new Set(gameAnswers)];
        if (gameAnswers.length > end) {
            gameAnswers.pop()
        }
    }
    gameAnswerButtons = [...answerButtons];
    gameAnswerButtons = gameAnswerButtons.sort(() => Math.random() - 0.5);
    gameAnswerButtons.forEach((el, index) => el.textContent = gameAnswers[index].toString())
    correctBtn = gameAnswerButtons[0];
}

function resetBtnListenersIncrementTrial () {
    btnListener = true;
    trial++;
}

function resetPostAnswer() {
    btnListener = false;
    question.textContent = "AND THE NEXT QUESTION IS...";
    answerButtons.forEach(el => {
        el.textContent = "...";
    })
}

function giveABuddy () {
    if (runningCorrect > maxCorrect) {
        maxCorrect = runningCorrect;
        runningCorrect = 0;
        if (receivedBuddies <= 10) {
            receivedBuddies++;
            setGameImages(false);
        }
        isWinner();
        feedback.textContent = "THAT'S CORRECT! YOU GOT A NEW BUDDY!";
    } else {
        feedback.textContent = posFeedbackList[getRandomInt(posFeedbackList.length)];
    }
}

function isWinner () {
    if (receivedBuddies === 11) {
        scoreDisplay.style.display = "none";
        winnerFeedback.style.display = "block";
    } else {
        buddiesText.textContent = `${receivedBuddies} OF 11`;
    }
}

answerButtons.forEach(el => {
    el.onclick = function () {
        if (btnListener === false) return
        if (el === correctBtn) {
            runningCorrect++;
            giveABuddy();
        } else {
            feedback.textContent = negFeedbackList[getRandomInt(negFeedbackList.length)];
            runningCorrect = 0;
        }
        resetPostAnswer();
    }
})

addBtn.onclick = function () {
    if (btnListener === true) return
    displayAnswers(10, 20, 6, 4);
    const num1 = getRandomInt(10);
    const num2 = gameAnswers[0] - num1;
    question.textContent = `WHAT IS ${num1} + ${num2} ?`;
    resetBtnListenersIncrementTrial();
}

subBtn.onclick = function () {
    if (btnListener === true) return
    displayAnswers(0, 10, 6, 5);
    const num2 = gameAnswers.pop(); 
    const sum = gameAnswers[0] + num2;
    question.textContent = `WHAT IS ${sum} - ${num2} ?`;
    resetBtnListenersIncrementTrial();
}

multBtn.onclick = function () {
    if (btnListener === true) return
    const num1 = getRandomInt(5);
    const num2 = getRandomInt(5);
    const prod = num1 * num2;
    displayAnswers(0, 25, 6, 4, true, prod);
    question.textContent = `WHAT IS ${num1} x ${num2} ?`;
    resetBtnListenersIncrementTrial();
}

divBtn.onclick = function () {
    if (btnListener === true) return
    displayAnswers(1, 6, 1, 5);
    const num2 = gameAnswers.pop(); 
    const prod = gameAnswers[0] * num2;
    question.textContent = `WHAT IS ${prod} % ${num2} ?`;
    resetBtnListenersIncrementTrial();
}

chBtn.onclick = function () {
    if (btnListener === true) return
    const num1 = getRandomInt(5)+1;
    const num2 = getRandomInt(5)+1;
    const num3 = getRandomInt(5)+1;
    let correctAns;
    if (trial % 2 === 0) {
        correctAns = num1 + num2 + num3;
        question.textContent = `WHAT IS ${num1} + ${num2} + ${num3} ?`;
    } else if (trial % 3 === 0) {
        correctAns = num1 * num2 + num3;
        question.textContent = `WHAT IS ${num1} x ${num2} + ${num3} ?`;
    } else {
        correctAns = num1 * (num2 + num3);
        question.textContent = `WHAT IS ${num1} x (${num2} + ${num3}) ?`; 

    }
    displayAnswers(0, 20, 6, 4, true, correctAns);
    resetBtnListenersIncrementTrial();
}

newGame.onclick = function () {    
    btnListener = false;
    correctBtn = 0;
    runningCorrect = 0;
    maxCorrect = 0;
    receivedBuddies = 1;
    imgList.forEach(im => im.style.visibility = "hidden");
    answerButtons.forEach(btn => btn.textContent = "...");
    question.textContent = "AND THE NEW QUESTION IS ...";
    feedback.textContent = "YOU ARE DOING AWESOME!";
    buddiesText.textContent = " 1 OUT OF 11";
    scoreDisplay.style.display = "block";
    winnerFeedback.style.display = "none";
    trial = 0;
    setGameImages();
}






