let level = 0;
var started = false;
let buttonColours = ["red","blue","green","yellow"];
let gamePattern = [];
let userClickedPattern = [];

$(".btn").on("click",function(event){
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatepress(userChosenColour);
    console.log(userClickedPattern);
    checkAnswer(userClickedPattern.length-1);
});
function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}
function animatepress(currentcolour){
    $("#"+currentcolour).addClass("pressed");
    setTimeout(function(){$("#"+currentcolour).removeClass("pressed");},100);
}
function nextSequence(){
    userClickedPattern = [];
    level++;
    $('h1').text("LEVEL "+level);
    let n = Math.random();
    let randomNumber = Math.floor(n*4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
$(document).keypress(function(){
    if(!started){
        $('h1').text("LEVEL "+level);
        nextSequence();
        started = true;
    }
})

function checkAnswer(currentlevel){
    if(gamePattern[currentlevel]==userClickedPattern[currentlevel]){
        console.log("sucess");
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong")
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        started = false;
        level = 0;
        gamePattern = [];
        console.log("wrong");
    }
}