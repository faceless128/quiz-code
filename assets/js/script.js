// Quiz questions array
var quizQuestions = [
  {"question" : "what CSS selector should you use to style one specific element" , "options" : ["id","name","class","div"], "answer" : "id"},
  {"question" : "How do you write comments in Javascript?" , "options" : ["// //","&lt;!-- --&gt;","/* */","##"], "answer" :"/* */"},
  {"question" : "Which HTML element would you use to link to external Javascript?" , "options" : ["link","script","a","img"], "answer" :"script"},
  {"question" : "what CSS property controls how elements are stacked on each other?" , "options" : ["x-axis","y-axis","x-index","z-index"], "answer" :"z-index"},
  {"question" : "which of these is not a semantic HTML element?" , "options" : ["main","nav","img","article"], "answer" :"img"}
];

// variables
var quizCount = "";
var currentQuestion = "";
var timeLeft = 0;
var quizTimer = "";
var playerName = "";
var savedScores = [];

// event handlers
var startQuiz = document.querySelector("#start-quiz");
var viewHighScores = document.querySelector("#view-high-scores");
var mainPageHTML = document.querySelector("#main-area").innerHTML;
var emergencyExit = document.querySelector("#time");

// start quiz
var startQuizHandler = function() {
  document.querySelector("#main-body").remove();
  document.querySelector("#start-quiz").remove();
  document.querySelector("#view-high-scores").textContent = "";
  quizCount = quizQuestions.length -1;
  timeLeft = 50;
  document.querySelector("#time").textContent = timeLeft; 
  var quizTimer = setInterval(function() {
    document.querySelector("#time").textContent = (timeLeft -1); 
    timeLeft--;
    // if (timeLeft < 0 && quizCount < 0) {
    //     clearInterval(quizTimer);
    //     return highScoresScreenHandler();
    // }
    // else 
    if (timeLeft < 0) {
      console.log(timeLeft)
      clearInterval(quizTimer);
      return highScoresScreenHandler();
    };
  }, 1000);
  if (timeLeft > 0) {
    askQuestion();
  }
  // else  {
  //     clearInterval(quizTimer);
  //     return highScoresScreenHandler();
  // };
}

// ask question
var askQuestion = function() {
  if (quizCount < 0) {
    clearInterval(quizTimer);
    enterHighScore();
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
    softReset()
    document.querySelector("#view-high-scores").textContent = "";
    document.querySelector(".time").textContent = "";
    document.querySelector("#title-text").textContent = "High Scores";
    document.querySelector("#main-body").textContent = "";
    // var startQuizButton = document.querySelector("#start-quiz");
    //  if (startQuizButton) startQuizButton.remove();
    document.querySelector("#start-quiz").remove();
    //  var nameFormDiv = document.querySelector("#name-form");
    //  if (nameFormDiv) nameFormDiv.remove();
    var highScoresNav = document.createElement("p");
    highScoresNav.innerHTML = '<span class="button" id="go-back">Go Back</span> <span class="button" id="clear-high-scores">Clear High Scores</span>';
    document.querySelector("#main-area").appendChild(highScoresNav);
    var viewMainPage = document.querySelector("#go-back");
    viewMainPage.addEventListener("click", mainPageHandler);
    var viewMainPage = document.querySelector("#clear-high-scores");
    viewMainPage.addEventListener("click", clearScores);
    displayScores();
}

// show main page
var mainPageHandler = function() {
    document.querySelector("#view-high-scores").textContent = "View High Scores";
    document.querySelector(".time").innerHTML = '<h2>Time: <spam id="time">0</spam></h2>';
    document.querySelector("#main-area").innerHTML = mainPageHTML;
    var startQuiz = document.querySelector("#start-quiz");
    startQuiz.addEventListener("click", startQuizHandler);
}

// injects default HTML into page
var softReset = function() {
    document.querySelector("#view-high-scores").textContent = "View High Scores";
    document.querySelector(".time").innerHTML = '<h2>Time: <spam id="time">0</spam></h2>';
    document.querySelector("#main-area").innerHTML = mainPageHTML;
}

// check answer
var checkAnswer = function(clickAnswer) {
  if (clickAnswer.target.matches(".choice")) {
    if (clickAnswer.target.innerHTML === currentQuestion.answer) {
      document.querySelector(".quiz-answers").remove();
      askQuestion();
    }
    else {
      document.querySelector(".quiz-answers").remove();
      if (timeLeft > 10) {
        timeLeft = timeLeft -10;
      } else {
        timeLeft = 0;
      }
      askQuestion();
    }
  }
}

// enter high score
var enterHighScore = function() {
    if (timeLeft < 1) {
        highScoresScreenHandler();
        return false;
    }
    document.querySelector("#main-area").innerHTML = mainPageHTML;
    document.querySelector(".time").textContent = "";
    document.querySelector("#title-text").textContent = "All Done!";
    document.querySelector("#main-body").textContent = "Your score is " + timeLeft;
    document.querySelector("#start-quiz").remove();
    var highScoreEntry = document.createElement("p");
    highScoreEntry.innerHTML = '<form id="name-form"><input type="text" name="player-name" placeholder="Enter Your Name" /><button class="button" id="save-score" type="submit">Save Score</button>';
    document.querySelector("#main-area").appendChild(highScoreEntry);
    var backupHighScore = document.querySelector("#save-score");
    backupHighScore.addEventListener("click", saveHighScore);
//  highScoresScreenHandler();
}

// save high score
var saveHighScore = function(submitForm) {
    submitForm.preventDefault();
    playerName = document.querySelector("input[name='player-name']").value;
    if (!playerName) {
       alert("You haven't entered your name!");
        return false;
    } else {
        var currentPlayer = {player_name: playerName, player_score: timeLeft};
        savedScores.push(currentPlayer);
        savedScores.sort((b, a) => a.player_score - b.player_score);
        saveScoresLS();
        highScoresScreenHandler();
    }
}

// save scores to local storage
var saveScoresLS = function() {
    localStorage.setItem("scores", JSON.stringify(savedScores));
};

// load scores from local storage
var loadScoresLS = function () {
    savedScores = localStorage.getItem("scores");
    if (!savedScores) {
        savedScores = [];
        return false;
    }
    savedScores = JSON.parse(savedScores);
};

// clear scores in browser and local storage
var clearScores = function() {
    localStorage.removeItem("scores");
    savedScores = [];
    mainPageHandler();
}

// display scores
var displayScores = function() {
    var highScoresList = document.createElement("p");
    for (var i = 0; i < savedScores.length; i++) {
        pushScore = savedScores[i];
        highScoresList.innerHTML += '<div id="scores-list"><span class="score-number">' + pushScore.player_score + ': </span><span>' + pushScore.player_name + '</span></div>';
    }
    document.querySelector("#main-body").appendChild(highScoresList);
}
loadScoresLS();

var exitGracefully = function(event) {
    console.log(event)
}

startQuiz.addEventListener("click", startQuizHandler);
viewHighScores.addEventListener("click", highScoresScreenHandler);
emergencyExit.addEventListener("DOMCharacterDataModified", exitGracefully);