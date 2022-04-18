//master script
// var questions = [ // array of 3 questions, creating objects in an array 
//     {
//         title: "Question 1",
//         id: 1,
//         answers: [ //building an array inside an object inside of an array
//             {
//                 label: "Answer 1",
//                 isCorrect: true,
//             },
//             {
//                 label: "Answer 2",
//                 isCorrect: false,
//             },
//             {
//                 label: "Answer 3",
//                 isCorrect: false,
//             }
//         ]
//     },
//     {
//         title: "Question 2",
//         id: 2,
//         answers: [ //building an array inside an object inside of an array
//             {
//                 label: "Answer 1",
//                 isCorrect: false,
//             },
//             {
//                 label: "Answer 2",
//                 isCorrect: true,
//             },
//             {
//                 label: "Answer 3",
//                 isCorrect: false,
//             }
//         ]
//     },
// ];

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
var timeEl = document.getElementById("timer");
var secondsLeft = 80;
var timerInterval;

// body elements 
var body = document.body;
var checkElement = document.querySelector(".check-answer");

// question scoring
var numberCorrectAnswers = 0;
var numberTotalQuestions = 0;
var finalScore = 0;
var btnCorrect = false;
var btnFinalQuestion = false;

//question Index
var questionIndex = 0;





// start quiz function, should include an event listener

var startQuiz = function () {
    //start button
    var startButtonEl = document.createElement("button");
    startButtonEl.textContent = "Start Quiz";
    startButtonEl.className = "start-btn";
    //   startButtonEl.setAttribute("data-task-id", taskId);
    // body.appendChild(startButtonEl);
    document.querySelector(".intoText").appendChild(startButtonEl);

    startButtonEl.addEventListener("click", renderQuestions);
    startButtonEl.addEventListener("click", setTime);

};
//render questions
var renderQuestions = function () {
    // for (let i = 0; i < questions.length; i++) { // this runs once
    var intoTextEL = document.querySelector('.intoText');
    intoTextEL.style.display = 'none';
    var question = questions[questionIndex];

    var h2El = document.createElement('h2');
    h2El.textContent = question.title;
    document.body.appendChild(h2El);
    answersEL = document.createElement('ol');
    answersEL.className = 'answers';
    document.body.appendChild(answersEL);

    for (let i = 0; i < question.answers.length; i++) {
        //single question in the for loop, this runs twice because we have 2 objects in the 1 array
        var answer = question.answers[i];

        var infoEl = document.createElement('li');

        infoEl.setAttribute('data-index', i);

        //buttons for answers
        infoEl.textContent = answer;
        document.body.appendChild(infoEl);
        var answerButtonEL = document.createElement('button');
        answerButtonEL.textContent = 'Select';
        answerButtonEL.className = 'answer-btn';
        answerButtonEL.style.margin = '12px';
        infoEl.appendChild(answerButtonEL);
        answerButtonEL.addEventListener('click', function () {
            console.log('test');

            // checkCorrectAnswer();
            for (let i = 0; i < answer.length; i++) {
                console.log("testing 2nd for loop");
                // var rightAnswer = questions.correctAnswer;
                var correctAnswer = answer[i];
                if (question.answers[i] === correctAnswer) {
                    console.log(correctAnswer);
                    btnCorrect = true;
                    var CheckAnTextEL = document.createElement("div");
                    CheckAnTextEL = document.querySelector(".result");
                    CheckAnTextEL.textContent = "Yes";
                    document.body.appendChild(CheckAnTextEL);
                    CheckAnTextEL.setAttribute("style", "color: green;");
                    numberCorrectAnswers++;


                } else if (question.answers[i] != correctAnswer) {
                    console.log(correctAnswer);
                    btnCorrect = false;
                    var CheckAnTextEL = document.createElement("div");
                    CheckAnTextEL = document.querySelector(".result");
                    CheckAnTextEL.textContent = "No!";
                    document.body.appendChild(CheckAnTextEL);
                    CheckAnTextEL.setAttribute("style", "color: red;");
                    secondsLeft -= 15;
                    checkTimeRemaining();
                } else {
                    console.log(correctAnswer);
                    questionIndex++;
                    renderQuestions();
                }


            }

        })
    };

    // debugger;
    //   answerButtonEL.addEventListener(click, compare);
};

// var checkCorrectAnswer = function () {
//     console.log("test2");
//     msgEl.setAttribute("data-answered", "Incorrect");
//     switch (correctAnswer) {
//         case 0:
//             msgEl.setAttribute("data-answered", "Correct");
//             break;
//     }
// };




var setTime = function () {
    timerInterval = setInterval(function () {
        secondsLeft--;

        if (!secondsLeft > 0) {
            secondsLeft = 0;
        }
        timeEl.textContent = "Time: " + secondsLeft.toString().padStart(2, '0');
        checkTimeRemaining();

    }, 1000);

};

var checkTimeRemaining = function () {
    if (secondsLeft <= 0 || btnFinalQuestion) {
        endQuiz();
        clearInterval(timerInterval);

        displayScores();
    }

};
var endQuiz = function () {
    if (questionIndex >= questions.length) {
        // All done will append last page with user stats

        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        questionIndex++;
        renderQuestions();
    }

};
var displayScores = function () {
    document.querySelector("#msgQuizDone").textContent = "All done!";
    if (!secondsLeft > 0) {
        secondsLeft = 0;
    }

    // var finalscore = 0;
    // had scope issues, made global for now
    finalscore = 0;
    if (numCorrectAnswers > 0) {

        finalscore = Math.round(100 * (numberCorrectAnswers / numberTotalQuestions) + (0.2 * secondsLeft));
        if (finalscore > 100) {
            finalscore = 100;
        }
    }
    console.log("note: Total questions= " + numberTotalQuestions + "\n correct answers= " + numberCorrectAnswers + "\n seconds left= " + secondsLeft + "\n final score= " + finalscore);

    document.querySelector("#msgScore").textContent = "Your final score is " + finalscore;


};

var setStorage = function () {

};

// questions[0].title = "Question 1"
// questions[0].answers = this is the whole array of answers 

//as the answers render put a data-attribute on the answers to say 'data-true or data-false' 



// save data in local storage for displaying on the HIGH SCORES Page
startQuiz();



// document.querySelector("#answers").addEventListener("click", function (event) {
//     //when this event clicked 

//     var element = event.target;

//     //if statement for if the correct answer is clicked 
//     var answerIndex = element.parentElement.getAttribute("data-index");
//     var checkElement = document.querySelector("#check-answer");
//     checkElement.textContent = questions[questionIndex].answers[answerIndex].isCorrect;



//     // else if for incorrect answer clicked
// 
// //next button that I did not add
// document.querySelector("#next").addEventListener("click", function (event) {
//     event.preventDefault();
//     questionIndex++;

//     renderQuestions()

//