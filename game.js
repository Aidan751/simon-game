
    
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


//######## Event handlers...#########//


$(document).keypress(function() {

    //1. This toggle if statement is here so that a user cant just tap the keys willy nilly and change levels. So if they push a key once, the level will be added to the heading h1 and then the sequence function will be run, after nextSequence has run, started will be set to true, meaning that this if conditional wont run again after this step.....head to next sequence function 
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

    // 3. Once a user clicks on a color, so after keys were pressed to reset the game, the user will be able to click a color, first we get this color by the id of the element we click on....we then push the selected color into the userClickedPattern array....we then gave this click handler some sound and some visuals with our reusable audio and visual functions that you can see below...Finally but most importantly we check our answer against the computer, we pass in our userClicked pattern as an argument into the checkAnswer function so that it can be used inside that functions scope. The purpose of using any length or number is usually to map through arrays, so this will be used to compare array indexes
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

//######## Event handlers...#########//



//######## functions...#########//


// 4. This is our final invoked function, at this point javascript is reading this code and running through its if statements to see if the values are truthy or falsey, the currentLevel parameter that has been passed in as an argument can be seen above, the argument is our userClickedPattern length. Now that pattern length is used compare the index of the item in our(user) array against the game pattern array, if that is true then we go into the nested if statement...inside the nested if statement you will see that the user pattern and game patterns lengths need to match, because that would mean that after the random color has been shown, we have selected our color and now it reflects that because our array is the same length as the pc array that our turn is finished....now if this is true we invoke the next sequence again and so the cycle continues until we get back to this evaluation stage again...This stage is important because the pc loops the program based on your actions.



function checkAnswer(currentLevel) {


    // match indexes of user and pc array items
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");


    //   so if the top condition is true, then run this if statement, if top statement is false then dont run this if statement and run else statement....this if statement will make sure we have taken our turn as our array length will be the same as the pc
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    //   Our else statement sends an error message in the heading, and flashes the screen red...it then invokes the start over function which essentially resets everything. 
    } else {
        // gives body red color based off of styles.css
        $('body').addClass('game-over');

        // creates red flash, set timeout is a call back function so its non blocking.
        setTimeout(function(){$('body').removeClass('game-over')}, 200);

        // add text to say the game is over in our heading
        $('#level-title').text('GAME OVER, press any key to restart');

        // resets the game
        startOver();
}

}



// 2. This function will run and perform a couple of functions, the user array will be reset if it has been interacted with(on a previous turn for example)...then the level number will update and be displayed on the screen....a new random color will flash on the screen and a strange retro sound will play.
function nextSequence() {

//This will reset the users pattern that has been created if there are any values to reset, just so that the pc and human generate answers in sync. 
  userClickedPattern = [];


// update level number  
  level++;

// update text in h1 to reflect level number  
  $("#level-title").text("Level " + level);


// Generate random number to use as an index of colors to be genegerated  
  var randomNumber = Math.floor(Math.random() * 4);

// creating a random color based off of the random index that Math.random generates.   
  var randomChosenColour = buttonColours[randomNumber];

// push that randomly generated color string to the pc new array, ie just to fill it will content   
  gamePattern.push(randomChosenColour);


//  i use template literals for dynamic content, you can use concatenation if you want, i now insert the color string(could randomy be 'red' or  'blue') and that string can be used as an actual string to declare variables. For instance, if the random color is 'blue', then the code below would be   $(`#blue`).fadeIn(100).fadeOut(100).fadeIn(100); because ${this is just a placeholder for a value as its a variable}...
  $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);


//   Call the playSound function with whatever random color is generated, the exact same thing will happen as above, except i left it as concatenation so that you can see both examples. play sound function will take this variable, and pass it in, like this: function playSound(name.....this name is whatever variable you passed in, in our case its randomChosenColor) {
  //var audio = new Audio("sounds/" + name...Our random chosen color gets concatenated here + ".mp3");
  //audio.play();
//}
  playSound(randomChosenColour);
}


// Reusable audio function that is invoked in next sequence function with the random color as an argument
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


// reusable animate function that takes in our random color as an argument for our currentColor parameter, if the color is clicked then a class(found in styles.css) will be added to the button, giving it some shitty grey color, 100 milliseconds later that class will be removed with the setTimeout function.
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


// This function will be invoked in the checkAnswers function, this will reset our settings pretty much back to default, started will need to return back to false in order for the sequence function to run again, the level needs to be set to zero other  
function startOver(){
    gamePattern = [];
    level = 0;
    started = false;
}


//######## functions...#########//