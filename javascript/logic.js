// bring in DOM elements from index.html


var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#time");
var startBtn = document.querySelector("#start");
var choicesEl = document.querySelector("#choices");
var submitBtn = document.querySelector("#submit");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");

//  create the variable for the quiz. 15 seconds for each question
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

function startQuiz() {
  // function to remove the start the screen to allow questions to appear
  var introductionEl = document.getElementById("introduction");
  introductionEl.setAttribute("class", "hide");

  // allowing the questions to show by hiding the class
  questionsEl.removeAttribute("class");

  // when clicked timer starts
  timerId = setInterval(clockTick, 1000);

  // place timer text on the page
  timerEl.textContent = time;

  getQuestion();
}

function getQuestion() {
  // gather current questions from array on questions.js
  var currentQuestion = questions[currentQuestionIndex];

  // placing the questions in the holding spot for questions
  var holderEl = document.getElementById("question-holder");
      holderEl.textContent = currentQuestion.title;

  // clear out asked/old questions
  choicesEl.innerHTML = "";



  //  looping over the questions 
  currentQuestion.choices.forEach(function(choice, i) {
    

    // creating the button to click the choices
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    // attaching a listener to each event
    choiceNode.onclick = questionClick;

    // lets throw the text on the page
    choicesEl.appendChild(choiceNode);
  });
}

function questionClick() {
  // for the user getting questions wrong
  if (this.value !== questions[currentQuestionIndex].answer) {
    // 15 second penalty when user is wrong
    time -= 15;

    if (time < 0) {
      time = 0;
    }
    // display new time on page and feedback for right or wrong answers
    timerEl.textContent = time;
    feedbackEl.textContent = "Try Again";
    feedbackEl.style.color = "red";
    feedbackEl.style.fontSize = "300%";
  } else {
    feedbackEl.textContent = "That's Right!";
    feedbackEl.style.color = "green";
    feedbackEl.style.fontSize = "300%";
  }

  // showing the feedback on the screen
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  // allowing to cycle for next question
  currentQuestionIndex++;

  // checking how much time is left
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}


//fucntion for whent the quiz ends
function quizEnd() {
  // stop the tipe
  clearInterval(timerId);

  // show the final screen, let the questions go away
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  // lets show the final score
  var finalScoreEl = document.getElementById("fscore");
  finalScoreEl.textContent = time;

  // hideing the question section
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  // updating the timer
  time--;
  timerEl.textContent = time;

  // if the user runs out of time
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // get value and the save score
  var initials = initialsEl.value.trim();

  if (initials !== "") {
    // save the the scores and get old scores from local storage
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // create variable for highscore for users
    var newScore = {
      score: time,
      initials: initials
    };

    // save the hiigh score to local storage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // go back to scores.html page
    window.location.href = "hscores.html";
  }
}

function checkForSumbit(event) {

  if (event.key === "submit") {
    saveHighscore();
  }
}

// submit initials
submitBtn.onclick = saveHighscore;

// start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForSumbit;