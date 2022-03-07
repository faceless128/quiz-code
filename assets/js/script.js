// Quiz questions array
var quizQuestions = [
    {"question" : "what CSS selector should you use to style one specific element" , "options" : ["id","name","class","div"], "answer" : "id"},
    {"question" : "what CSS property controls how elements are stacked on each other?" , "options" : ["x-axis","y-axis","x-index","z-index"], "answer" :"z-index"},
    {"question" : "Which HTML element would you use to link to external Javascript?" , "options" : ["link","script","a","img"], "answer" :"script"},
    {"question" : "How do you write comments in Javascript?" , "options" : ["// //","&lt;!-- --&gt;","/* */","##"], "answer" :"/* */"},
    {"question" : "which of these is not a semantic HTML element?" , "options" : ["main","nav","img","article"], "answer" :"img"}
];

// variables
var quizCount = "";
var currentQuestion = "";
var timeLeft = 0;
var quizTimer = "";

// event handlers
var startQuiz = document.querySelector("#start-quiz");
var viewHighScores = document.querySelector("#view-high-scores");
var mainPageHTML = document.querySelector("#main-area").innerHTML;

// start quiz
var startQuizHandler = function() {
    document.querySelector("#main-body").remove();
    document.querySelector("#start-quiz").remove();
    document.querySelector("#view-high-scores").textContent = "";
    quizCount = quizQuestions.length -1;
    timeLeft = 75;
    var quizTimer = setInterval(function() {
        document.querySelector("#time").textContent = timeLeft; 
        timeLeft--;
        if (timeLeft < 0 || quizCount< 0) {
            clearInterval(quizTimer);
        }
    }, 1000);
    if (timeLeft > 0) {
        askQuestion();
    }
}

// ask question
var askQuestion = function() {
    if (quizCount < 0) {
        console.log("you finished with " + timeLeft);
        clearInterval(quizTimer);
        saveHighScore();
        return;
    }
    currentQuestion = quizQuestions[quizCount];
    document.querySelector("#title-text").textContent = currentQuestion.question;
    var answerChoices = document.createElement("div");
    answerChoices.className = "quiz-answers";
    for (var i = 0; i < currentQuestion.options.length; i++) {
        answerChoices.innerHTML = answerChoices.innerHTML + '<span class="button choice">' + currentQuestion.options[i] + '</span>';
    }

    document.querySelector("#main-area").appendChild(answerChoices);
    
    var clickAnswer = document.querySelector(".quiz-answers");
    clickAnswer.addEventListener("click", checkAnswer);

    quizCount--
}

// show high scores
var highScoresScreenHandler = function() {
    document.querySelector("#view-high-scores").textContent = "";
    document.querySelector(".time").textContent = "";
    document.querySelector("#title-text").textContent = "High Scores";
    document.querySelector("#main-body").textContent = "24: Joe";
    document.querySelector("#start-quiz").remove();
    var highScoresNav = document.createElement("p");
    highScoresNav.innerHTML = '<span class="button" id="go-back">Go Back</span> <span class="button" id="clear-high-scores">Clear High Scores</span>';
    document.querySelector("#main-area").appendChild(highScoresNav);
    var viewMainPage = document.querySelector("#go-back");
    viewMainPage.addEventListener("click", mainPageHandler);
}

// show main page
var mainPageHandler = function() {
    document.querySelector("#view-high-scores").textContent = "View High Scores";
    document.querySelector(".time").innerHTML = '<h2>Time: <spam id="time">0</spam></h2>';
    document.querySelector("#main-area").innerHTML = mainPageHTML;
    var startQuiz = document.querySelector("#start-quiz");
    startQuiz.addEventListener("click", startQuizHandler);
}

// check answer
var checkAnswer = function(clickAnswer) {
    if (clickAnswer.target.matches(".choice")) {
        if (clickAnswer.target.innerHTML === currentQuestion.answer) {
            document.querySelector(".quiz-answers").remove();
            console.log("right");
            askQuestion();
        }
        else {
            document.querySelector(".quiz-answers").remove();
            console.log("wrong");
            timeLeft = timeLeft -10;
            askQuestion();
        }
    }
}

// save high score
var saveHighScore = function() {
    console.log(timeLeft);
    document.querySelector("#view-high-scores").textContent = "View High Scores";
    document.querySelector(".time").innerHTML = '<h2>Time: <spam id="time">0</spam></h2>';
    document.querySelector("#main-area").innerHTML = mainPageHTML;
    // var startQuiz = document.querySelector("#start-quiz");
    // startQuiz.addEventListener("click", startQuizHandler);
    highScoresScreenHandler();

}

startQuiz.addEventListener("click", startQuizHandler);
viewHighScores.addEventListener("click", highScoresScreenHandler);
