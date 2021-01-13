/* Variable initialization */
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;
var buttonColours = ["red", "blue", "green", "yellow"];

/* Key down Event Listener */
$("body").keydown(function() {
  if (!gameStarted) {
    nextSequence();
    gameStarted = true;
  }
})

/* Button click event listener */
$(".btn").on('click', function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

/* sequence generation */
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").html("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  //Game Pattern generated
  gamePattern.push(randomChosenColour);
  //Button animation
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  //Sound play
  playSound(randomChosenColour);
}

/* Play sound */
function playSound(fileName) {
  var audio = new Audio("sounds/" + fileName + ".mp3");
  audio.play();
}

/* animation */
function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

/* pattern verification */
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1500);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").html("Game Over, Press Any Key to Restart");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

/* Restart game */
function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}
