var questions = [{
        title: "Question 1",
        answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        correctAnswer: "answer 1"
    },
    {
        title: "Question 2",
        answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
        correctAnswer: "answer 3"
    }
];

var timeEl = document.getElementById("timer");
var secondsLeft = 70;
var timerInterval;


var questionTitle = document.querySelector("#Question");
var choice1El = document.querySelector("#btnA1");
var choice1El2El = document.querySelector("#btnA2");
var choice3El = document.querySelector("#btnA3");
// var choice4El = document.querySelector("#btnA4");
// var takeQuiz = document.querySelector("#takeQuiz");
var finalScore = document.querySelector("#finalScore");
var startMainQuiz = document.querySelector("#quizBody");
var msgEl = document.querySelector("#results");
var msgDone = document.querySelector("#msgQuizDone");
var msgScoreEl = document.querySelector("#msgScore");

var numberCorrectAnswers = 0;
var numberTotalQuestions = 0;
var questionIndex = 0; // first question starts at 0
var blnCorrect = false;
var finalScore = 0;
var blnFinalQuestion = false;


var startQuiz = document.querySelector("#takeQuiz");
startQuiz.addEventListener("click", function (event) {
    console.log("test"); 
    var element = event.target;
    if (element.matches("button")) {

        msgEl.textContent = element.getAttribute("data-answered");
        msgEl.style.color = "red";
        // console.log(msgEl);
        if (element.getAttribute("data-answered") === "Correct") {
            blnCorrect = true;
            msgEl.style.color = "green";
            numCorrectAnswers++;
        } else {
            // incorrect answer, penalize them 15 second
            secondsLeft -= 15;
            checkTimeRemaining();

        }
        // alert("loading next question idxQuestion is"+idxQuestion);
        // load the next question
        questionIndex++;
        loadQuestion();
    }

});


var loadQuestion = function () {
    var isCorrect = -99;
    if (questions[questionIndex] === undefined) {
        // We have reached the end of file on our questions array
        blnFinalQuestion = true;
        //disable the buttons so they cannot keep scoring points!
        disableQuiz();
        return;
    }
    var correctAnswer = questions[questionIndex].answer;
    numTotalQuestions++;

    //we have a global questions array already in memory, and the current index
    qTitle.textContent = questions[questionIndex].title;

    //add processing to shuffle the answer choices in case they took this quick before
    questions[questionIndex].choices.sort(function () {
        return 0.5 - Math.random();
    });


    // find out which choice is the correct one
    for (i = 0; i < questions[questionIndex].choices.length; i++) {
        if (questions[questionIndex].choices[i] === correctAnswer) {
            idxCorrect = i;
        }
    }

    c1El.textContent = questions[questionIndex].choices[0];
    c2El.textContent = questions[questionIndex].choices[1];
    c3El.textContent = questions[questionIndex].choices[2];
    c4El.textContent = questions[questionIndex].choices[3];

    c1El.setAttribute("data-answered", "Incorrect");
    c2El.setAttribute("data-answered", "Incorrect");
    c3El.setAttribute("data-answered", "Incorrect");
    c4El.setAttribute("data-answered", "Incorrect");

    switch (idxCorrect) {
        case 0:
            c1El.setAttribute("data-answered", "Correct");
            break;
        case 1:
            c2El.setAttribute("data-answered", "Correct");
            break;
        case 2:
            c3El.setAttribute("data-answered", "Correct");
            break;
        case 3:
            c4El.setAttribute("data-answered", "Correct");
            break;

    }

};