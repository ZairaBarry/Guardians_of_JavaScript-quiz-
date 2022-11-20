'use strict';

//Questions and aswers container
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

// Declaring variables

var timeCount = document.getElementById("timer");
var qContainer = document.getElementById("questionContainer");
var elQuestion = document.getElementById("question");
var elAnswers = document.getElementById("answers");
var startBtn = document.getElementById("btn");

const submit = document.getElementById('submition');
const submitBtn = document.getElementById('submitBtn');
const initials = document.getElementById('initials');
const list = document.getElementById('list');
const restartBtn = document.getElementById('restart');
const startCommand = document.querySelector(".command");
const showScore = document.getElementById('showScore');
const clear = document.getElementById('clear');
const highScore = document.getElementById('high-score');


let elNumber;
let timer = 0;
let countingTimer;
let storage = []
let score = 0;
let username = {};



//function to start the quiz

startBtn.addEventListener("click", startQuiz);
submitBtn.addEventListener('click', displayScore);
restartBtn.addEventListener('click', restart);
showScore.addEventListener('click', function () {
    startCommand.classList.add('hide');
    displayScore();
});
clear.addEventListener('click', function () {
    localStorage.clear();
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    storage = [];
});

function startQuiz() {
    startCommand.classList.add("hide");
    qContainer.classList.remove("hide");
    // elAnswers.classList.remove("hide");
    timer = 20;
    elNumber = 0;
    startTime();
    while (elAnswers.firstChild) {
        elAnswers.removeChild(elAnswers.firstChild);
    }
    showQuestion(questions[elNumber]);
};


//function  finish quiz
function quizOver() {
    timeCount.innerHTML = "Finish";
    qContainer.classList.add('hide');
    highScore.classList.add('hide');
    submit.classList.remove('hide');
    timer = 0;
};



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
    if (timer <= 0 || !submit.classList.contains('hide')) {
        clearInterval(countingTimer);
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
        timer -= 5;
        clearQuestion();
        elNumber++;
        showQuestion(questions[elNumber]);

    } else if (elNumber == questions.length - 1) {
        quizOver();
    } else {
        score += 5;
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

function setLocal() {
    username.name = initials.value.toUpperCase();
    username.score = score;
    if (username.name !== '') {

        storage.push(username);
        console.log(storage);
    }


    if (storage !== []) {
        console.log('Hi')
        localStorage.setItem("scores", JSON.stringify(storage));
        storage = [];
        storage = JSON.parse(localStorage.getItem('scores'));
    }
}

function displayScore() {
    console.log(storage);
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    setLocal();

    if (storage !== []) {

        for (let i = 0; i < storage.length; i++) {
            const li = document.createElement('li');
            li.innerText = `${i + 1}. ${storage[i].name} score:${storage[i].score}`
            list.appendChild(li);
        }
    }

    submit.classList.add('hide');
    highScore.classList.remove('hide');

}

function restart() {
    highScore.classList.add('hide');
    startCommand.classList.remove("hide");

};


