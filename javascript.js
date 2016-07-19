var playing = false;
var score;
var mycounter;
var correctResult;
var life = 3;
var difficulty;
var x;
var stall = false;
document.getElementById("start").onclick = function () {
    //if we are playing
    if (!playing) {
        //set the score to 0
        score = 0;
        life = 3;
        hide("gameover");
        document.getElementById("scorevalue").innerHTML = score;
        document.getElementById("guesses").innerHTML = life;
        document.getElementById("timeRemaining").style.display = "block";
        if (document.getElementById("howLong").value != "" &&
            document.getElementById("timeRemaining") != "" ) {
            x = document.getElementById("howLong").value;
            difficulty = document.getElementById("difficulty").value;
            var myTime = document.getElementById("timeRemaining");
            document.getElementById("start").innerHTML = "Reset";
            mycounter = setInterval(
                function () {
                    x -= 1;
                    stopCountdown(x);
                    myTime.innerHTML = "Time: " + x + " s";
                }, 1000);
            playing = true;
        }
    } else {
        location.reload(); //reload the page
    }

    //generate question and answer
    selectOperation ();

    //check answer
    checkAnswer();
};

//selection operation
function selectOperation () {
    var selection = document.getElementById("operations").value;
    if (selection == "addition"){
        generateAddition();
    } else if (selection == "subtraction"){
        generateSubtraction();
    } else if (selection == "multiplication"){
        generateMultiplication();
    } else if (selection == "division"){
        generateDivision();
    } else if (selection == "random"){
        // create a random set of numbers from 1 - 4
        var randomSlt = Math.round(Math.random()*4);
        if (randomSlt == 1){
            generateAddition();
        } else if (randomSlt == 2){
            generateMultiplication();
        } else if (randomSlt == 3){
            generateMultiplication();
        } else if (randomSlt == 4){
            generateDivision();
        }
    }
}

function checkAnswer() {
    for (var i = 1; i < 5; i++){
        document.getElementById("box"+i).onclick = function () {
            // click the answer box while the game is running
            if (playing){
                if (this.innerHTML == correctResult){
                    score++;
                    document.getElementById("scorevalue").innerHTML = score;

                    //hide the wrong boxes
                    hide("wrong");
                    show("correct");
                    setTimeout(function(){
                        hide("correct")
                    }, 1000);
                    //generate new question
                    selectOperation ();

                } else {
                    //wrong answer
                    hide("correct");
                    show("wrong");
                    setTimeout(function(){
                        hide("wrong")
                    }, 1000);
                    life--;
                    document.getElementById("guesses").innerHTML = life;
                    if (life == 0){
                        playing = false;
                        clearInterval(mycounter);
                        show("gameover");
                        document.getElementById("gameover").innerHTML = "<p> Game Over</p> <p>Your score is " + score + ". </p>";
                    }
                }
            }
        }
    }
}

//multiplication
function generateMultiplication(){
    var x = Math.round(Math.random()* difficulty) + 1;
    var y = Math.round(Math.random()* difficulty) + 1;
    correctResult = x * y;
    document.getElementById("question").innerHTML = x + " * " + y;
    var correctPosition = Math.round(Math.random() * 3) + 1;
    document.getElementById("box"+correctPosition).innerHTML = correctResult;

    //the other boxes with wrong answer
    var array = [correctResult];
    for (var i=1; i < 5; i++){
        if (i != correctPosition){
            var wronganswer;
            do {
                wronganswer = (Math.round(difficulty * Math.random())+1) * (Math.round(difficulty * Math.random())+1);
                document.getElementById("box"+i).innerHTML = wronganswer;
            } while (array.indexOf(wronganswer) > -1);
            array.push(wronganswer);
        }
    }
}
// division
function generateDivision(){
    var x = Math.round(Math.random()* difficulty) + 1;
    var y = Math.round(Math.random()* difficulty) + 1;
    correctResult = (x / y).toFixed(4);
    document.getElementById("question").innerHTML = x + " / " + y;
    var correctPosition = Math.round(Math.random() * 3) + 1;
    document.getElementById("box"+correctPosition).innerHTML = correctResult;

    //the other boxes with wrong answer
    var array = [correctResult];
    for (var i=1; i < 5; i++){
        if (i != correctPosition){
            var wronganswer;
            do {
                wronganswer = ((Math.round(difficulty * Math.random())+1) / (Math.round(difficulty * Math.random())+1)).toFixed(4);
                document.getElementById("box"+i).innerHTML = wronganswer;
            } while (array.indexOf(wronganswer) > -1);
            array.push(wronganswer);
        }
    }
}

// addition
function generateAddition(){
    var x = Math.round(Math.random()* difficulty) + 1;
    var y = Math.round(Math.random()* difficulty) + 1;
    correctResult = x + y;
    document.getElementById("question").innerHTML = x + " + " + y;
    var correctPosition = Math.round(Math.random() * 3) + 1;
    document.getElementById("box"+correctPosition).innerHTML = correctResult;

    //the other boxes with wrong answer
    var array = [correctResult];
    for (var i=1; i < 5; i++){
        if (i != correctPosition){
            var wronganswer;
            do {
                wronganswer = ((Math.round(difficulty * Math.random())+1) + (Math.round(difficulty * Math.random())+1));
                document.getElementById("box"+i).innerHTML = wronganswer;
            } while (array.indexOf(wronganswer) > -1);
            array.push(wronganswer);
        }
    }
}

//subtraction
function generateSubtraction(){
    var x = Math.round(Math.random()* difficulty) + 1;
    var y = Math.round(Math.random()* difficulty) + 1;
    correctResult = x - y;
    document.getElementById("question").innerHTML = x + " - " + y;
    var correctPosition = Math.round(Math.random() * 3) + 1;
    document.getElementById("box"+correctPosition).innerHTML = correctResult;

    //the other boxes with wrong answer
    var array = [correctResult];
    for (var i=1; i < 5; i++){
        if (i != correctPosition){
            var wronganswer;
            do {
                wronganswer = ((Math.round(difficulty * Math.random())+1) - (Math.round(difficulty * Math.random())+1));
                document.getElementById("box"+i).innerHTML = wronganswer;
            } while (array.indexOf(wronganswer) > -1);
            array.push(wronganswer);
        }
    }
}



function stopCountdown(x){
    //check if time is up
    if (x == 0) {
        show("gameover");
        document.getElementById("gameover").innerHTML = "<p> Game Over</p> <p>Your score is " + score + ". </p>";
        clearInterval(mycounter);
        document.getElementById("start").innerHTML = "Start";
        playing = false;
    }
}

function show (Id) {
    document.getElementById(Id).style.display = "block";
}

function hide (Id) {
    document.getElementById(Id).style.display = "none";
}



