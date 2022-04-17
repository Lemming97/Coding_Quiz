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
var msgEl = document.querySelector(".result");
var checkElement = document.querySelector(".check-answer");

// question scoring
var numberCorrectAnswers = 0;
var numberTotalQuestions = 0;
var finalScore = 0;

//question Index
var questionIndex = 0;
var blnCorrect = false;


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

};





//present questions function 


var renderQuestions = function () {


    // for (let i = 0; i < questions.length; i++) { // this runs once
    var intoTextEL = document.querySelector(".intoText");
    intoTextEL.style.display = "none";
    var question = questions[questionIndex];



    var h2El = document.createElement("h2");
    h2El.textContent = question.title;
    document.body.appendChild(h2El);
    answersEL = document.createElement("ol");
    answersEL.className = "answers";
    document.body.appendChild(answersEL);



    for (let i = 0; i < question.answers.length; i++) { //single question in the for loop, this runs twice because we have 2 objects in the 1 array
        var answer = question.answers[i];


        var infoEl = document.createElement("li");

        infoEl.setAttribute("data-index", i);

        //buttons for answers
        infoEl.textContent = answer;
        document.body.appendChild(infoEl);
        var answerButtonEL = document.createElement("button");
        answerButtonEL.textContent = "Select";
        answerButtonEL.className = "answer-btn";
        answerButtonEL.style.margin = "12px";
        infoEl.appendChild(answerButtonEL);
    };
    // debugger;
    document.querySelector("#answers").addEventListener("click", function (event) {
        console.log("test");
        if (answerButtonEL.matches("li")) {
            //which button did they click
            // console.log("button clicked: " + element.id);
            // alert("You clicked the "+element.getAttribute("data-answered")+" answer");
            console.log(answerButtonEL);
            msgEl.textContent = element.getAttribute("data-answered");
            msgEl.style.color = "red";
            // console.log(msgEl);
            if (answerButtonEL.getAttribute("data-answered") === "Correct") {
                blnCorrect = true;
                msgEl.style.color = "green";
                numberCorrectAnswers++;
            } else {
                // incorrect answer, penalize them 15 second
                secondsLeft -= 15;
                checkTimeRemaining();

            }
        
            questionIndex++;
            renderQuestions();
        };
    });

};

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
    if (secondsLeft <= 0 || blnFinalQuestion) {
        disableQuiz();
        clearInterval(timerInterval);

        displayScores();
    }

};
var displayScores = function () {

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
// });
// //next button that I did not add
// document.querySelector("#next").addEventListener("click", function (event) {
//     event.preventDefault();
//     questionIndex++;

//     renderQuestions()

// });