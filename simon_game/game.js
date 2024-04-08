const buttonColour = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(() => {
  if (!started) {
    nextSequence();
    $('#level-title').text('Level ' + level);
    started = true;
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $('#level-title').text('Level ' + level);
  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColour[randomNumber];
  gamePattern.push(randomChosenColour);
  $(`#${randomChosenColour}`).animate({ opacity: 0 }).animate({ opacity: 1 });

  var audio = new Audio('./sounds/' + randomChosenColour + '.mp3');
  audio.play();
}

function playSound(name) {
  var audio = new Audio('./sounds/' + name + '.mp3');
  audio.play();
}

$('.btn').click(function () {
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  var lastAnswer = userClickedPattern.length - 1;
  checkAnswer(lastAnswer);
});

function animatePress(currentColour) {
  $('#' + currentColour).addClass('pressed');
  setTimeout(() => {
    $('#' + currentColour).removeClass('pressed');
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log('success');
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence(), 1000;
      });
    }
  } else {
    console.log('wrong');

    var audio = new Audio('./sounds/wrong.mp3');
    audio.play();

    $('body').addClass('game-over');
    setTimeout(() => {
      $('body').removeClass('game-over');
    }, 200);

    $('#level-title').text('Game Over, Press Any Key To Restart');
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
