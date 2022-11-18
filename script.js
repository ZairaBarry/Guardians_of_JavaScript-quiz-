'use strict';

var questions = [
    {
        question: "Which statement cannot be used to declare a variable in JavaScript?",
        answers: [
            { text: "let", correct: false },
            { text: "int", correct: true },
            { text: "var", correct: false },
            { text: "const", correct: false }
        ]
    },

    {
        question: "Can you assign a anonymous function to a variable?",
        answers: [
            { text: "true", correct: true },
            { text: "false", correct: false },

        ]
    },

    {
        question: "Which of the following will write the message “Hello DataFlair!” in an alert box?",
        answers: [
            { text: 'alertBox(“Hello DataFlair!”)', correct: false },
            { text: 'alert(Hello DataFlair!)', correct: false },
            { text: 'msgAlert(“Hello DataFlair!”)', correct: false },
            { text: 'alert(“Hello DataFlair!”);', correct: true }
        ]
    },


    {
        question: " Which of the following is a server-side JavaScript object??",
        answers: [
            { text: "function", correct: false },
            { text: "file", correct: false },
            { text: "fileUpload", correct: false },
            { text: "Date", correct: true }
        ]
    },

    {
        question: "Which of the following statements are true for Javascript?",
        answers: [
            { text: "JavaScript is case sensitive", correct: false },
            { text: "JavaScript statements can be grouped together in blocks", correct: false },
            { text: "semicolon at the end of statement is mandatory", correct: true },
            { text: "Both a and b above", correct: false }
        ]
    },


    {
        question: "Which attribute needs to be changed to make elements invisible?",
        answers: [
            { text: "visibility", correct: true },
            { text: "visible", correct: false },
            { text: "invisibility", correct: false },
            { text: "invisible", correct: false }
        ]
    },

    {
        question: " Which of the following is the tainted property of a window object in JavaScript?",
        answers: [
            { text: "Pathname", correct: false },
            { text: "Protocol", correct: false },
            { text: "Defaultstatus", correct: true },
            { text: "Host", correct: false }
        ]
    },

    {
        question: " Is it possible to declare a variable in Javascript along its type?",
        answers: [
            { text: "Yes", correct: false },
            { text: "No", correct: true }

        ]
    },

    {
        question: "Which of the following syntax is correct to refer an external script called “formValidation.js”?",
        answers: [
            { text: "< script href = “formValidation.js”>", correct: false },
            { text: "< script href = “formValidation.js”>", correct: false },
            { text: "< script name = “formValidation.js”>", correct: false },
            { text: "< script src = “formValidation.js”>", correct: true }
        ]
    },

    {
        question: "What type of image maps could be used with JavaScript?",
        answers: [
            { text: "Client-side image maps", correct: true },
            { text: "Server-side image maps", correct: false },
            { text: "Both A and B", correct: false },
            { text: "Localhost image maps", correct: false }
        ]
    },
];

// DOM elements
var timeCount = document.getElementById("timer");
var qContainer = document.getElementById("questionContainer");
var elQuestion = document.getElementById("question");
var elAnswers = document.getElementById("answers");
var pointsContainer = document.getElementById("pointsContainer");
var startBtn = document.getElementById("btn");
var showScore = document.getElementById("showScore");
const submit = document.querySelector('.submition');
const start = document.querySelector('command');
const highScore = document.getElementById('high-score');

//declarung variables
let elNumber;
let timer = 60;
let countingTimer;
let finalScore;
let score = 0;
var max_score = 10;
let username = "";

let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

//function to start the quiz

startBtn.addEventListener("click", startQuiz);
showScore.addEventListener("click", displayPoint);

function startQuiz() {
    startBtn.classList.add("hide");
    submit.classList.add("hide");
    elAnswers.classList.remove("hide");
    elNumber = 0;
    qContainer.classList.remove("hide");
    pointsContainer.innerHTML = "";
    startTime();
    while (elAnswers.firstChild) {
        elAnswers.removeChild(elAnswers.firstChild);
    }
    showQuestion(questions[elNumber]);
};

//function to show the questions
function showQuestion(question) {
    elQuestion.innerText = question.question;
    question.answers.forEach(answer => {
        var button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("scores");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", chooseAnswer);
        elAnswers.appendChild(button);
    });

}

///function to set the timer
function startTime() {
    timeCount.innerHTML = "Time left: " + timer;
    if (timer <= 0) {
        quizOver();
    } else {
        timer -= 1;
        countingTimer = setTimeout(startTime, 1000);
    }
};

//function to gather answers
function chooseAnswer(e) {
    var choisenButton = e.target;
    if (!choisenButton.dataset.correct) {
        timer = timer - 5;
        console.log(timer);
    }
    if (elNumber == questions.length - 1) {
        quizOver();
    } else {
        clearQuestion();
        elNumber++;
        showQuestion(questions[elNumber]);
        console.log(score);
    }
}

//function to clear the current question
function clearQuestion() {
    while (elAnswers.firstChild) {
        elAnswers.removeChild(elAnswers.firstChild);
    }
};


//function  finish quiz
function quizOver() {
    clearInterval(countingTimer);
    timeCount.innerHTML = "Finish";
    clearQuestion();
    showResults();
    start.classList.add('hide');
    highScore.classList.add('hide');
    submit.classList.remove('hide');
    // startBtn.innerText = "Restart";
    // startBtn.classList.remove("hide");
    timer = 90;
    score = 0;
}


function showResults() {
    finalScore = timer;
    if (finalScore < 0) {
        finalScore = 0;
    }
    elQuestion.innerText = "";
    pointsContainer.classList.remove("hide");
    elAnswers.classList.add("hide");
    pointsContainer.innerHTML = `Your score is ${finalScore}!<div id="init">Name: <input type="text" name="initials" id="initials" placeholder="Enter Your Name"><button id="save-btn" class="save-btn scores" onclick="submitPoints(event)" disabled>Save</button>`;
    username = document.getElementById("initials");
    let saveButton = document.getElementById("save-btn");
    // username.addEventListener("keyup", function () {
    //     saveButton.disabled = !username.value;
    // });
}

//function to submit score 
function submitPoints(e) {
    var score = {
        score: finalScore,
        name: username.value
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(max_score);
    localStorage.setItem("highScores", JSON.stringify(highScores));

    displayPoint();
}


//function to display high scores
function displayPoint() {
    clearInterval(countingTimer);
    countdown.innerHTML = "";
    clearQuestion();
    elNumber.innerText = "";
    pointsContainer.classList.remove("hide");

    pointsContainerinnerHTML = `<h2>Top 10 High Scores</h2><ul id="highScoresList"></ul><button id="clearScores" class="scores" onclick="clearScores()">Clear Scores</button>`;
    var highScoresList = document.getElementById("highScoresList");
    highScoresList.innerHTML = highScores
        .map(score => {
            return `<li class="scoresList">${score.name} - ${score.score}</li>`;
        })
        .join("");
    startBtn.classList.remove("hide");
    highScoresButton.classList.add("hide");
}


function clearScores() {
    highScores = [];
    highScores.innerHTML = "<h3>Scores have been Cleared</h3>";
    document.getElementById("clearScores").classList.add("hide");
}

function submitScores(e) {
    var score = {
        score: finalScore,
        name: username.valueOf
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(mazx_score);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    displayPoint();
}

//function to display high scores
function displayScores() {
    clearInterval(countingTimer);
    countdown.innerHTML = "";
    clearQuestion();
    elNumber.innerText = "";
    pointsContainer.classList.remove("hide");

    pontsContainer.innerHTML = `<h2>Top 10 High Scores</h2><ul id="highScoresList"></ul><button id="clearScores" class="btn" onclick="clearScores()">Clear Scores</button>`;
    var highScoresList = document.getElementById("highScoresList");
    highScoresList.innerHTML = highScores
        .map(score => {
            return `<li class="scoresList">${score.name} - ${score.score}</li>`;
        })
        .join("");
    btn.classList.remove("hide");
    highScoresButton.classList.add("hide");
}


//function to clear high scores
function clearScores() {
    highScores = [];
    highScoresList.innerHTML = "<h3>Scores have been Cleared</h3>";
    document.getElementById("clearScores").classList.add("hide");
}

