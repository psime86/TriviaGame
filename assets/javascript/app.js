$(document).ready(function() {
    // Trivia Questions //
    var triviaQuestions = [
    {
    // Question
        question: "Sideshow Bob's archenemy is?",
    // Choices
        choices: ["Bart", "Selma", "Rakes", "Musical Theater"],
    // Answer index (0-3)
        answer: 2,
    // Gif/Img
        gif: "assets/images/SideshowBob.gif"
    },
    {
        question: "Who shot Mr Burns?",
        choices: ["Homer", "Maggie","Smithers", "Barney"],
        answer: 1,
        gif: "assets/images/Maggie.gif"
    },
    {
        question: "What NFL team is given to Homer by Hank Scorpio?",
        choices: ["The Broncos", "The Cowboys", "The Jets", "The 49ers"],
        answer: 0,
        gif: "assets/images/Broncos.gif"
    },
    {
        question: "What did Lionel Hutz change his name to?",
        choices: ["Philip McNeille", "Daniel Cartright", "Cowboy Steve", "Miguel Sanchez"],
        answer: 3,
        gif: "assets/images/MiguelSanchez.gif"
}];
    

    // Variables //

    // Right answers
    var right = 0;
    // Wrong answers
    var wrong = 0;
    // Skipped questions
    var skipped = 0;
    // Show questions
    var holder = [];
    var totalQuestions = triviaQuestions.length;
    var nextQuestion = [];
    // Timer
    var timer = 20;
    var running = false;
    var intervalId;
    // User answer
    var userAnswer = "";
    var pick;
    var index;



    // Start game with start button //

    // On click event
    $("#start").on("click", function(){
		$("#start").hide();
		displayQuestion();
		runTimer();
		for(var i = 0; i < triviaQuestions.length; i++){
        holder.push(triviaQuestions[i]);
        console.log(timer)
        }
    })
    
    // Countdown timer //

    // Timer start
    function runTimer(){
        if (!running){
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }

    // Timer stop
    function stop(){
        running = false;
        clearInterval(intervalId);
    }

    // Timer running
    function decrement(){
        $("#timeleft").html("<h2>Time remaining: " + timer + "</h2>");
        timer --;
        
        // Timer = 0 //

        // Timer stop
        // Time is up message
        // Display correct answer
        // Skip count up
        // Show picture
        if (timer === 0){
            skipped ++;
            stop();
            $("#answers").html("<p>Out of time! Correct answer is: " + pick.choices[pick.answer] + "</p>");
            console.log(skipped)
            runGif();
        }
    }

    // Displaying the questions //

    function displayQuestion(){
        //generate random index in trivia question array
        index = Math.floor(Math.random()*triviaQuestions.length);
        pick = triviaQuestions[index];

        $("#questions").html("<h2>" + pick.question + "</h2>");
        for(var i = 0; i < pick.choices.length; i++){
            var answerChoice = $("<div>");
            console.log(answerChoice);
            answerChoice.addClass("answerchoice");
            answerChoice.html(pick.choices[i]);
            answerChoice.attr("data-guessvalue", i);
            $("#answers").append(answerChoice);
        }
    }

    // Picking answers //

    // On click event

    $(document).on("click", ".answerchoice", function(){
        userAnswer = parseInt($(this).attr("data-guessvalue"));
        console.log(userAnswer);

        // If right //

        // Timer stop
        // Correct message
        // Win count up
        // Show picture
        if (userAnswer === pick.answer) {
            stop();
            right ++;
            userAnswer="";
            $("#answers").html("<h4>Correct!</h4>");
            console.log(right);
            runGif();
        }

        // Else wrong //

        // Timer stop
        // Wrong message
        // Display correct answer
        // Wrong count up
        // Show picture
        else {
            stop();
            wrong ++;
            userAnswer="";
            $("#answers").html("<h4>Incorrect! The correct answer is: " + pick.choices[pick.answer] + "<?h4>");
            console.log(wrong);
            runGif();
        }
    })

    // Function to be checked after each question //

    // Display GIF
    function runGif(){
        $("#answers").append("<img src=" + pick.gif + ">");
        nextQuestion.push(pick);
        triviaQuestions.splice(index,1);

        // Stop GIF from running //

        var hideGif = setTimeout(function(){
            $("#answers").empty();
            timer= 20;
        
        
        // Check if new questions are available
        // Show right/wrong/skipped count if game is done
        if ((right + wrong + skipped) === totalQuestions){
            $("#questions").empty();
            $("#questions").html("<h2>Game Over! Results: </h2>");
            $("#answers").append("<h3>Right: " + right + "</h3>");
            $("#answers").append("<h3>Wrong: " + wrong + "</h3>");
            $("#answers").append("<h3>Skipped: " + skipped + "</h3>");
        }
        // Display next question
        else {
            runTimer();
            displayQuestion();
        }
        // After 9 seconds of GIF goodness
    }, 9000);
}

    // Replay function //

    // Reset game on click
    $(document).on("click", "#reset", function(){
        $("#answers").empty();
        $("#questions").empty();
		for(var i = 0; i < holder.length; i++){
        triviaQuestions.push(holder[i]);
        }
        displayQuestion();
        runTimer();
    })
   
})