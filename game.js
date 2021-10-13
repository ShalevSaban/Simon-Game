var buttonColours = ["red", "blue", "green", "yellow"];
var randomChosenColour;
var gamePattern = new Array();
var userClickedPattern = new Array();
var gameHasStarted = false;
var level = 0;


//generate random integer between 0 to max 
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


function nextSequence() {
    level++;
    userClickedPattern = [];
    $("h1").text("Level " + level);
    var randomNumber = getRandomInt(4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    animatePress(randomChosenColour);
}

//detect the chosen button 
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length - 1);
});


//given the color name and play the related sound 
function playSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

// add and remove animate press
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


//detect key press and start game
$(document).keydown(function() {
    if (gameHasStarted == false) {
        nextSequence();
        gameHasStarted = true;
    }
});


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 2000);
        }
    } else
        startOver();

}




function startOver() {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    userClickedPattern = [];
    gamePattern = [];
    level = 0;
    gameHasStarted = false;
}