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
var superTiger = document.getElementById("super-tiger-img");
var superPanda = document.getElementById("super-panda-img");
var superSheep = document.getElementById("super-sheep-img");
var superSloath = document.getElementById("super-sloath-img");

var question = document.getElementById("math-question");
var feedback = document.getElementById("feedback-text");
var buddiesText = document.getElementById("updatable-buddies");

const answerButtons = [firstAnsBtn, secondAnsBtn, thirdAnsBtn, fourthAnsBtn];
const imgList = [bear,fox,lion,racoon,seal,tiger, superPanda,superSheep,superSloath, superTiger];
let imgPos = [0,1,2,3,4,5,6,7,8,9];
const ansPos = [0,1,2,3];
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
let correctBtn = 0;
let runningCorrect = 0;
let maxCorrect = 0;
let receivedBuddies = 1;
let trial = 0;


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function resetPostAnswer() {
    btnListener = false;
    question.textContent = "AND THE NEXT QUESTION IS...";
    answerButtons.forEach(el => {
        el.textContent = "...";
    })
}

function giveABuddy (run, max) {
    if (run > max) {
        maxCorrect = runningCorrect;
        runningCorrect = 0;
        receivedBuddies++;
        buddiesText.textContent = receivedBuddies.toString() + " OF 11 "
        const buddyPos = imgPos[getRandomInt(imgPos.length)];
        imgList[buddyPos].style.visibility = "visible";
        imgPos = imgPos.filter(pos => pos !== buddyPos);
        feedback.textContent = "THAT'S CORRECT! YOU GOT A NEW BUDDY!"
    } else {
        feedback.textContent = posFeedbackList[getRandomInt(posFeedbackList.length)];
    }
}


answerButtons.forEach((el, index) => {
    el.onclick = function () {
        if (btnListener === false) return
        if (correctBtn === index) {
            runningCorrect++;
            giveABuddy(runningCorrect, maxCorrect);
        } else if (correctBtn !== index) {
            feedback.textContent = negFeedbackList[getRandomInt(negFeedbackList.length)];
            runningCorrect = 0;
        }
        resetPostAnswer();
    }
})


addBtn.onclick = function () {
    if (btnListener === true) return
    const num1 = getRandomInt(10);
    const num2 = getRandomInt(10);
    const correctAns = num1 + num2;
    const correctAnsPos = getRandomInt(3);
    answerButtons[correctAnsPos].textContent = correctAns.toString();
    const remAnsPos = ansPos.filter(pos => pos != correctAnsPos);
    let usedNums = [];
    remAnsPos.forEach(el => {
        let ans = num1 + getRandomInt(10);
        while (ans === correctAns || usedNums.includes(ans)) {
            ans = num1 + getRandomInt(10);
        }
        usedNums.push(ans);
        answerButtons[el].textContent = ans.toString()
    })
    question.textContent = "WHAT IS "+ num1.toString()+ " + " + num2.toString() + "?";
    correctBtn = correctAnsPos;
    btnListener = true;
}

subBtn.onclick = function () {
    if (btnListener === true) return
    const num1 = getRandomInt(10);
    const num2 = getRandomInt(10);
    const sum = num1 + num2;
    const correctAns = num1;
    const correctAnsPos = getRandomInt(3);
    answerButtons[correctAnsPos].textContent = correctAns.toString();
    const remAnsPos = ansPos.filter(pos => pos != correctAnsPos);
    let usedNums = [];
    remAnsPos.forEach(el => {
        let ans = getRandomInt(10);
        while (ans === correctAns || usedNums.includes(ans)) {
            ans = getRandomInt(10);            
        }
        usedNums.push(ans);
        answerButtons[el].textContent = ans.toString()
    })
    question.textContent = "WHAT IS "+ sum.toString()+ " - " + num2.toString() + "?";
    correctBtn = correctAnsPos;
    btnListener = true;
    trial++;
}

multBtn.onclick = function () {
    if (btnListener === true) return
    const num1 = getRandomInt(5);
    const num2 = getRandomInt(5);
    const correctAns = num1 * num2;
    const correctAnsPos = getRandomInt(3);
    answerButtons[correctAnsPos].textContent = correctAns.toString();
    const remAnsPos = ansPos.filter(pos => pos != correctAnsPos);
    let usedNums = [];
    remAnsPos.forEach(el => {
        let ans = getRandomInt(5) * getRandomInt(5);
        while (ans === correctAns || usedNums.includes(ans)) {
            ans = getRandomInt(5) * getRandomInt(5);            
        }
        usedNums.push(ans);
        answerButtons[el].textContent = ans.toString()
    })
    question.textContent = "WHAT IS "+ num1.toString()+ " x " + num2.toString() + "?";
    correctBtn = correctAnsPos;
    btnListener = true;
    trial++;
}

divBtn.onclick = function () {
    if (btnListener === true) return
    const num1 = getRandomInt(5)+1;
    const num2 = getRandomInt(5)+1;
    const correctAns = num1;
    const prod = num1 * num2;
    const correctAnsPos = getRandomInt(3);
    answerButtons[correctAnsPos].textContent = correctAns.toString();
    const remAnsPos = ansPos.filter(pos => pos != correctAnsPos);
    let usedNums = [];
    remAnsPos.forEach(el => {
        let ans = getRandomInt(10);
        while (ans === correctAns || usedNums.includes(ans)) {
            ans = getRandomInt(10);            
        }
        usedNums.push(ans);
        answerButtons[el].textContent = ans.toString()
    })
    question.textContent = "WHAT IS "+ prod.toString()+ " % " + num2.toString() + "?";
    correctBtn = correctAnsPos;
    btnListener = true;
    trial++;
}

chBtn.onclick = function () {
    if (btnListener === true) return
    const num1 = getRandomInt(5)+1;
    const num2 = getRandomInt(5)+1;
    const num3 = getRandomInt(5)+1;
    let correctAns = 0;
    if (trial % 2 === 0) {
        correctAns = num1 + num2 + num3; 
        question.textContent = "WHAT IS "+ num1.toString() + " + " + num2.toString()+ " + " + num3.toString() + "?";
    } else if (trial % 3 === 0) {
        correctAns = num1 * num2 + num3;
        question.textContent = "WHAT IS "+ num1.toString() + " x " + num2.toString()+ " + " + num3.toString() + "?";
    } else {
        correctAns = num1 * (num2 + num3);
        question.textContent = "WHAT IS "+ num1.toString() + " x (" + num2.toString()+ " + " + num3.toString() + ") ?"; 

    }
    const correctAnsPos = getRandomInt(3);
    answerButtons[correctAnsPos].textContent = correctAns.toString();
    const remAnsPos = ansPos.filter(pos => pos != correctAnsPos);
    let usedNums = [];
    remAnsPos.forEach(el => {
        let ans = getRandomInt(20);
        while (ans === correctAns || usedNums.includes(ans)) {
            ans = getRandomInt(20);            
        }
        usedNums.push(ans);
        answerButtons[el].textContent = ans.toString()
    })
    correctBtn = correctAnsPos;
    btnListener = true;
    trial++;
}

newGame.onclick = function () {
    imgPos = [0,1,2,3,4,5,6,7,8,9];
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
    trial = 0;
}






