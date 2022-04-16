//master script
var questions = [ // array of 3 questions, creating objects in an array 
    {
        title: "Question 1",
        id: 1,
        answers: [ //building an array inside an object inside of an array
            {
                label: "Answer 1",
                isCorrect: true,
            },
            {
                label: "Answer 2",
                isCorrect: false,
            },
            {
                label: "Answer 3",
                isCorrect: false,
            }
        ]
    },
    {
        title: "Question 2",
        id: 2,
        answers: [ //building an array inside an object inside of an array
            {
                label: "Answer 1",
                isCorrect: false,
            },
            {
                label: "Answer 2",
                isCorrect: true,
            },
            {
                label: "Answer 3",
                isCorrect: false,
            }
        ]
    },
];

var body = document.body;
var questionIndex = 0;



// var h1El = document.createElement("h1");



//timer
var timeEl = document.getElementById("timer");
var secondsLeft = 70;
var timerInterval;

// function setTime() {
//     timerInterval = setInterval(function () {
//         secondsLeft--;

//         if (!secondsLeft > 0) {
//             secondsLeft = 0;
//         }
//         timeEl.textContent = "Time: " + secondsLeft.toString().padStart(2, '0');
//         checkTimeRemaining();

//     }, 1000);
// }

// start quiz function, should include an event listener

var startQuiz = function () {

    //start
    var startButtonEl = document.createElement("button");
    startButtonEl.textContent = "Star Quiz";
    startButtonEl.className = "btn start-btn";
    //   startButtonEl.setAttribute("data-task-id", taskId);
    // body.appendChild(startButtonEl);
    document.querySelector(".intoText").appendChild(startButtonEl);

    startButtonEl.addEventListener("click", renderQuestions);

}



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
        infoEl.textContent = answer.label;
        document.body.appendChild(infoEl);
        var answerButtonEL = document.createElement("button");
        answerButtonEL.textContent = "Select";
        answerButtonEL.className = "select-btn btn-answer-btn";
        answerButtonEL.style.margin = "12px";
        infoEl.appendChild(answerButtonEL);

    }
    console.log(document.querySelector("answers"));
    document.querySelector("answers").addEventListener("click", function (event) {
        //when this event clicked 
        console.log("Test click");
        var element = event.target;

        //if statement for if the correct answer is clicked 
        if (event.matches("button") === true) {
            var answerIndex = element.parentElement.getAttribute("data-index");
            var checkElement = document.createElement("p");
            checkElement.textContent = questions[questionIndex].answers[answerIndex].isCorrect;
            document.body.appendChild(checkElement);

        }

        // else if for incorrect answer clicked
    });

}


// questions[0].title = "Question 1"
// questions[0].answers = this is the whole array of answers 

//as the answers render put a data-attribute on the answers to say 'data-true or data-false' 



// save data in local storage for displaying on the HIGH SCORES Page
startQuiz();
