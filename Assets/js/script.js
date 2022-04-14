//master script

//timer
var timeEl = document.getElementById("timer");
var secondsLeft = 70;
var timerInterval;

function setTime() {
    timerInterval = setInterval(function () {
        secondsLeft--;

        if (!secondsLeft > 0) {
            secondsLeft = 0;
        }
        timeEl.textContent = "Time: " + secondsLeft.toString().padStart(2, '0');
        checkTimeRemaining();

    }, 1000);
}




var body = document.body;

//questions & answers data


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
];


for (let i = 0; i < questions.length; i++) { // this runs once
    var question = questions[i];

    // console.log(question);
    var h2El = document.createElement("h2");
    h2El.textContent = question.title;
    document.body.appendChild(h2El);

    for (let i = 0; i < question.answers.length; i++) { //single question in the for loop, this runs twice because we have 2 objects in the 1 array
        var answer = question.answers[i];

        // console.log(answer);
        var infoEl = document.createElement("div");
        infoEl.textContent = answer.label[i];
        document.body.appendChild(infoEl);



    }

}

// questions[0].title = "Question 1"
// questions[0].answers = this is the whole array of answers 

//as the answers render put a data-attribute on the answers to say 'data-true or data-false' 