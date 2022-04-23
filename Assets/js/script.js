//master script
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

var setTime = function () {
    timerInterval = setInterval(function () {
        // secondsLeft--;

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            endQuiz(); // this function is not working
        }
        timeEl.textContent = "Time: " + secondsLeft.toString().padStart(2, '0');
        checkTimeRemaining();
        secondsLeft--;


    }, 1000);

};


// body elements 
var body = document.body;
var checkElement = document.querySelector('#check-answer');
var StartQuizParent = document.querySelector('#StartQuiz');
var initialInput = document.querySelector('#initials');
var initialSubmitBtn = document.querySelector('#submitBtn');
// var createDiv = document.querySelector("#end-quiz");
var createDiv = document.querySelector('h1');
var questionsEL = document.querySelector('#questions');

// question scoring
var numberCorrectAnswers = 0;
var numberTotalQuestions = 0;
var finalScore = 0;
var btnCorrect = false;
var btnFinalQuestion = false;

//question Index
var questionIndex = 0; // this is equal to i
var startButtonEl = document.querySelector("#buttonEl");
// start quiz function, should include an event listener

//render questions
var renderQuestions = function () {
    setTime();
    // for (let i = 0; i < questions.length; i++) { // this runs once
    var intoTextEL = document.querySelector('.intoText');
    intoTextEL.style.display = 'none';
    // var question = questions[questionIndex];
    var h2El = document.createElement('h2');
    // h2El.textContent = question.title;
    document.body.appendChild(h2El);
    // questionsEL.appendChild(h2El);
    answersEL = document.createElement('ol');
    answersEL.className = 'answers';
    // document.body.appendChild(answersEL);


    for (let i = 0; i < questions.length; i++) {

        //single question in the for loop, this runs twice because we have 2 objects in the 1 array
        var question = questions[i];
        h2El.textContent = question.title;
        var answer = question.answers[i];
        var correctAnswer = question.correctAnswer;
        var infoEl = document.createElement('li');
        infoEl.setAttribute('value', answer);

        //buttons for answers
        infoEl.textContent = answer;
        document.body.appendChild(answersEL);
        document.body.appendChild(infoEl);


        infoEl.addEventListener('click', function (event) {

            i.question.forEach(function (question, i) {
                console.log("test")
                if (correctAnswer === event.target.textContent) {
                    // console.log(event.target);
                    // console.log(event.target.value);
                    // console.log('Correct!');
                    // console.log(event.target.textContent);
                    // console.log(correctAnswer);
                    btnCorrect = true;

                    var CheckAnTextEL = document.createElement("div");
                    CheckAnTextEL = document.querySelector("#result");
                    CheckAnTextEL.textContent = "Correct";
                    document.body.appendChild(CheckAnTextEL);
                    CheckAnTextEL.setAttribute("style", "color: green;");
                    numberCorrectAnswers++;
                    // h2El.innerHTML = "";
                } else if (correctAnswer != event.target.textContent) {
                    // console.log(event.target.value);
                    // console.log('Incorrect!');
                    // console.log(event.target.textContent);
                    // console.log(correctAnswer);
                    btnCorrect = false;
                    var CheckAnTextEL = document.createElement("div");
                    CheckAnTextEL = document.querySelector("#result");
                    CheckAnTextEL.textContent = "Incorrect!";
                    document.body.appendChild(CheckAnTextEL);

                    CheckAnTextEL.setAttribute("style", "color: red;");
                    secondsLeft -= 15;
                    checkTimeRemaining();
                    // h2El.innerHTML = "";

                } else {
                    // h2El.innerHTML = "";
                    questionIndex++;
                    renderQuestions();
                }
            })

        })
    };

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

var startQuiz = function () {
    //start button
    startButtonEl.textContent = "Start Quiz";
    startButtonEl.className = "start-btn";
    //   startButtonEl.setAttribute("data-task-id", taskId);
    // body.appendChild(startButtonEl);
    document.querySelector(".intoText").appendChild(startButtonEl);
    renderQuestions();
    // startButtonEl.addEventListener("click", setTime);
};

startButtonEl.addEventListener('click', startQuiz);

var checkTimeRemaining = function () {
    if (secondsLeft <= 0 || btnFinalQuestion) {
        clearInterval(timerInterval);
        endQuiz();
        // displayScores();}

    }
};
var endQuiz = function () {
    questionIndex = questions.length;

    if (questionIndex >= questions.length) {
        // All done will append last page with user stats
        document.querySelector('ol').textContent = "";
        document.querySelector('li').textContent = "";

        createDiv.textContent = "End of quiz!";
        document.body.appendChild(createDiv);
        // + " " + "You got  " + score + "/" + questions.length + " Correct!";
    }
    // else {
    //     // questionIndex++;
    //     // renderQuestions();
    // }

};
// var displayScores = function () {
//     document.querySelector("#msgQuizDone").textContent = "All done!";
//     if (!secondsLeft > 0) {
//         secondsLeft = 0;
//     }

//     // var finalscore = 0;
//     // had scope issues, made global for now
//     finalscore = 0;
//     if (numCorrectAnswers > 0) {

//         finalscore = Math.round(100 * (numberCorrectAnswers / numberTotalQuestions) + (0.2 * secondsLeft));
//         if (finalscore > 100) {
//             finalscore = 100;
//         }
//     }
//     console.log("note: Total questions= " + numberTotalQuestions + "\n correct answers= " + numberCorrectAnswers + "\n seconds left= " + secondsLeft + "\n final score= " + finalscore);

//     document.querySelector("#msgScore").textContent = "Your final score is " + finalscore;

// };





//local storage
initialSubmitBtn.addEventListener("click", function (event) {
    event.preventDefault();

    var name = {
        initial: initialInput.value.trim()
    };

    // set new submission to local storage 
    localStorage.setItem("name", JSON.stringify(name));
    var test = JSON.parse(localStorage.getItem('name'));
    console.log(test.initialInput);

});