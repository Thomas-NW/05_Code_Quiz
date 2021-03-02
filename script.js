// https://www.bing.com/videos/search?q=JS+Track+questions+in+quiz+&&view=detail&mid=DC599EE11BC0F9A379E3DC599EE11BC0F9A379E3&&FORM=VRDGAR&ru=%2Fvideos%2Fsearch%3Fq%3DJS%2BTrack%2Bquestions%2Bin%2Bquiz%2B%26FORM%3DHDRSC4

var triQuestionSection = document.getElementById('triviaQuestion'); 
var trivAnswerSection = document.getElementById('triviaAnswer');
var timerEl = document.getElementById('countdown');
var timerE2 = document.getElementById('questiontimer');

var timeLeft = 15;
var myInterval = 5;


var questionTracker = [];
var randQuestion = 0;
var winCounter = 0;
var looseCounter = 0;
var wins = localStorage.getItem('Wins');
var loses = localStorage.getItem('Loses');
var winScore = wins;
var playmateName = document.getElementById('playmate');

var quizQuestions = [];
quizQuestions[0] = "What is an array?";
quizQuestions[1] = "What is a function?";
quizQuestions[2] = "How do you add a value to an array in JS?";

var quizAnswers = []; // The last letter in the array == correct answer
quizAnswers[0] = ["a", "b", "c", "d", "a"];
quizAnswers[1] = ["e", "f", "g", "h", "e"];
quizAnswers[2] = ["i", "j", "k", "l", "i"];

function timedText() {
    countdown();
    localStorage.setItem("Wins", 0);
    localStorage.setItem("Loses", 0);
    winScore = 0;
    setTimeout(myTimeout1, 0000) 
    setTimeout(myTimeout2, 5000) 
    setTimeout(myTimeout3, 10000)
    setTimeout(myTimeout4, 15000)
  }

  function myTimeout1() {
    randomQuestion();
  }
  function myTimeout2() {
    randomQuestion();
    // document.getElementById("startQuizzButton").innerHTML = "10 seconds";
  }
  function myTimeout3() {
    // countdown();
    randomQuestion();
    // document.getElementById("startQuizzButton").innerHTML = "10 seconds";
  }
  function myTimeout4() {
    // countdown();
    randomQuestion();
    $(".hideanswer").hide();
    // document.getElementById("startQuizzButton").innerHTML = "10 seconds";
  }


  function countdown() {
     // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
      // As long as the `timeLeft` is greater than 1
      if (timeLeft > 1) {
        // Call randomQuestion() function to render the first question
        // randomQuestion();
        // Set the `textContent` of `timerEl` to show the remaining seconds
        timerEl.textContent = timeLeft + ' seconds remaining';
        // Decrement `timeLeft` by 1
        timeLeft--;
      } else if (timeLeft === 1) {
        // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
        timerEl.textContent = timeLeft + ' second remaining';
        timeLeft--;
      } else {
        // Once `timeLeft` gets to 0, set `timerEl` to an empty string
        timerEl.textContent = '';
        // Use `clearInterval()` to stop the timer
        clearInterval(timeInterval);
        // Call the `displayMessage()` function
        displayMessage();
      }
    }, 1000);
  }

  function displayMessage() {
    displaymessage.innerHTML = "This is the end of the game!";
  }


  function randomQuestion() {
    var questionAlreadyPicked = false;
    randQuestion = Math.floor(Math.random() * quizQuestions.length);
    for (var i = 0; i <= questionTracker.length; i++) {
        if (randQuestion == questionTracker[i]) {
            questionAlreadyPicked = true;
            break;
        }
        else {
            questionAlreadyPicked = false;
        }
    }

    if (questionAlreadyPicked && questionTracker.length !== quizQuestions.length) {
        randomQuestion();
    }
    else if (questionTracker.length == quizQuestions.length) {
        triQuestionSection.innerHTML = "Congratualtions, you have answered all questions!";
        $(".hideanswer").hide();
        return;
        
    }
    else {
        questionTracker.push(randQuestion);
        triQuestionSection.innerHTML = "Question: " + quizQuestions[randQuestion];
        displayAnswers();
        console.log(randQuestion);
    }
  }

  function displayAnswers() {
    while (trivAnswerSection.firstChild) {
        trivAnswerSection.removeChild(trivAnswerSection.firstChild);
    }
    for (var i = 0; i < 4; i++) {
        var buttonToAdd = document.createElement("button");
        buttonToAdd.textContent = quizAnswers[randQuestion][i];
        trivAnswerSection.appendChild(buttonToAdd);
    }
  }
  trivAnswerSection.addEventListener("click", function (event) {
    isButton = event.target.nodeName === 'BUTTON';
    if (!isButton) {
        return;
     } else {
         var questionGuess = event.target.innerHTML;
         if (questionGuess == quizAnswers[randQuestion][4]) {
              winCounter += 1;
              localStorage.setItem('Wins', winCounter);
              console.log("win: " + winCounter);
          }
         else {
              looseCounter += 1;
              timeLeft -= 5;
              localStorage.setItem('Loses', looseCounter);
              console.log("loose: " + looseCounter);
          }
      } 
       randomQuestion();
    }
  ) 

function populateStorage() {
  var playmate1 = playmateName.value;
  localStorage.setItem('player', playmate1);
  topScore(playmate1, winCounter);  
}


// For reference only: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects

function topScore(playmate, highscore) {
  var previousHighScore = localStorage.getItem("Highscore");
  if(highscore > previousHighScore) {
    localStorage.setItem("Highscore", highscore);
    localStorage.setItem("HighScoreplayer", playmate);
  }
}

function initializePage (){
  var topName = localStorage.getItem("HighScoreplayer");
  var topScore = localStorage.getItem("Highscore");
  document.getElementById("highscorename").innerHTML=topName;
  document.getElementById("highscorevalue").innerHTML=topScore;
  
}
initializePage ();

