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

//timer
var timeEl = document.querySelector("#timer");
var secondsLeft = 80;
var timerInterval;

var setTime = function () {
timerInterval = setInterval(function () {
    secondsLeft--;

    // if (secondsLeft === 0) {
    //     clearInterval(timerInterval);
    //     endQuiz(); // this function is not working
    // }
    timeEl.textContent = "Time: " + secondsLeft.toString().padStart(2, '0');
    checkTimeRemaining();
    // secondsLeft--;


}, 1000);

};
//check time remaining
var checkTimeRemaining = function () {
if (secondsLeft <= 0) {
    clearInterval(timerInterval);
    endQuiz();

}
};
//question Index
var questionIndex = 0; // this is equal to i

// question scoring
// var numberCorrectAnswers = 0;
// var numberTotalQuestions = 0;
// var finalScore = 0;
// var btnCorrect = false;
// var btnFinalQuestion = false;

//body elements
var wholeQuizBodyEl = document.querySelector("#whole-quiz-body");
var quizBodyEl = document.querySelector("#quiz-body");
var quizTitleEl = document.querySelector("#quiz-title");
var quizAnsEl = document.querySelector("#answers");
// var startTextEL = document.querySelector(".start");
var initialInputEL = document.querySelector('#initials'); //input field for initials 
var initialSubmitBtn = document.querySelector('#submitBtn'); // save high scores
var startQuizBtnEl = document.querySelector("#startQuizBtn");
// var createDiv = document.querySelector('h1');






var startQuiz = function () {
// hide the starting screen
var openScreenEl = document.querySelector("#start-quiz-window");
openScreenEl.setAttribute("class", "hide");

// un-hide questions section
quizBodyEl.removeAttribute("class");

// start timer
setTime();

//renderQuestions
renderQuestions();


}

var renderQuestions = function () {
// setTime();
// get current question object from array
var displayNewQuestion = questions[questionIndex];

// update title with current question
quizTitleEl.textContent = displayNewQuestion.title;

// clear out any old question answers
quizAnsEl.innerHTML = "";

//loop over questions
displayNewQuestion.answers.forEach(function (answer, i) {
    // create new button for each choice
    var answerSelection = document.createElement('button');
    answerSelection.setAttribute("class", "answer");
    answerSelection.setAttribute("value", answer);

    answerSelection.textContent = (i + 1) + ". " + answer;

    // attach click event listener to each answer
    answerSelection.addEventListener('click', questionSelections);
    // answerSelection.onclick = questionClick;

    // display on the page
    quizAnsEl.appendChild(answerSelection);

});

};

var questionSelections = function () {
// check if user guessed wrong
if (this.value !== questions[questionIndex].correctAnswer) {
    // penalize time
    secondsLeft -= 15;
    checkTimeRemaining();
    // display new time on page
    var CheckAnTextEL = document.querySelector("#result");
    timeEl.textContent = secondsLeft;
    CheckAnTextEL.textContent = "Incorrect!";
    CheckAnTextEL.style.color = "red";
    CheckAnTextEL.style.fontSize = "150%";

} else /*if (this.value === questions[questionIndex].correctAnswer) */ {
    var CheckAnTextEL = document.querySelector("#result");
    CheckAnTextEL.textContent = "Correct!";
    CheckAnTextEL.style.color = "green";
    CheckAnTextEL.style.fontSize = "150%";
}
// flash Correct/Incorrect feedback
CheckAnTextEL.setAttribute("class", "result");
setTimeout(function () {
    CheckAnTextEL.setAttribute("class", "result hide");
}, 1000);

// next question
questionIndex++;


// time checker
if (questionIndex > questions.length - 1) {
    endQuiz();
} else {
    renderQuestions();
}
}



// var questionSelections = function() {
//     // var question = questionIndex[i];
//     var correctAnswer = questionIndex.correctAnswer;
//     var infoEl = document.createElement('li');

//     infoEl.addEventListener('click', function (event) {
//         // check if user guessed wrong
//         if (correctAnswer != event.target.textContent) {
//             CheckAnTextEL.textContent = "Incorrect!";
//             document.body.appendChild(CheckAnTextEL);
//             CheckAnTextEL.setAttribute("style", "color: red;");
//             secondsLeft -= 15;
//             checkTimeRemaining();

//             if (secondsLeft < 0) {
//                 secondsLeft = 0;
//             }
//             // display new time on page
//             timerEl.textContent = secondsLeft;
//             CheckAnTextEL.textContent = "Incorrect!";
//             CheckAnTextEL.style.color = "red";
//             CheckAnTextEL.style.fontSize = "150%";

//         } else if (correctAnswer === event.target.textContent) {
//             // check if user guessed correctly
//             btnCorrect = true;
//             var CheckAnTextEL = document.createElement("div");
//             CheckAnTextEL = document.querySelector("#result");
//             CheckAnTextEL.textContent = "Correct";
//             document.body.appendChild(CheckAnTextEL);
//             CheckAnTextEL.setAttribute("style", "color: green;");
//             // numberCorrectAnswers++;
//             CheckAnTextEL.textContent = "Correct!";
//             CheckAnTextEL.style.color = "green";
//             CheckAnTextEL.style.fontSize = "150%";
//         }

//         // flash Correct/Incorrect feedback
//         CheckAnTextEL.setAttribute("class", "feedback");
//         setTimeout(function () {
//             CheckAnTextEL.setAttribute("class", "feedback hide");
//         }, 1000);

//         // next question
//         questionIndex++;

//         // time checker
//         if (questionIndex === questions.length - 1) {
//             endQuiz();
//         } else {
//             renderQuestions();
//         }
//     })
// };



var endQuiz = function () {
questionIndex = questions.length;
// stop timer
clearInterval(timerInterval);
console.log(timerInterval);

if (questionIndex >= questions.length) {

    // hide questions section
    wholeQuizBodyEl.setAttribute("class", "hide");
    // startTextEL.setAttribute("class", "hide");

    var endScreenEl = document.querySelector("#end-quiz");
    endScreenEl.removeAttribute("class");
    // All done will append last page with user stats
    // document.querySelector('ol').textContent = "";
    // createDiv.textContent = "End of quiz!";
    // document.body.appendChild(createDiv);
    // show final score
    var finalScoreEl = document.querySelector("#final-score");
    finalScoreEl.textContent = secondsLeft;

    // hide questions section
    wholeQuizBodyEl.setAttribute("class", "hide");

}
};

// //local storage
// initialSubmitBtn.addEventListener("click", function () {
//     console.log("testing button");
//     var saveScore = {
//         initial: initialInputEL.value.trim(),
//         score: secondsLeft
//     };
//     // set new submission to local storage 
//     localStorage.setItem("saveScore", JSON.stringify(saveScore));
//     // var test = JSON.parse(localStorage.getItem('saveScore'));

//     // // redirect to next page
//     // document.location.href = "highscores.html";
//     document.location.href = "highscores.html";


// });

// // need logic to store multiple scores and listing them off 
// // sorts of data you can represents =: string, number, boolean, object, array 
// // push into an array, array.sort and array.slice/splice
// // need access to previous high scores to save to new high scores -> get them from where they are store and modiy the list to store them again

// // var saveHighScores = function () {
// //     var highScores =
// //         JSON.parse(window.localStorage.getItem("highScores")) || [];

// //     // save to local storage
// //     highScores.push(saveScore);
// //     highScores.setItem("highScores", JSON.stringify(highScores));



// // };
var saveHighScore = function () {
// get value of input box
var userInitials = initialInputEL.value.trim();

if (userInitials !== "") {
    // get saved scores from local storage, or if not any, set to empty array
    var highScores =
        JSON.parse(window.localStorage.getItem("highScores")) || [];

    // format new score object for current user
    var newScore = {
        score: secondsLeft,
        userInitials: userInitials
    };

    // save to local storage
    highScores.push(newScore);
    window.localStorage.setItem("highScores", JSON.stringify(highScores));

    // redirect to next page
    window.location.href = "highscores.html";
}


};

initialSubmitBtn.addEventListener("click", function () {

});



startQuizBtnEl.addEventListener('click', startQuiz);
console.log("test");
// saveHighScores();