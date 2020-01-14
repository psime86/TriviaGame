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
        photo: "assets/images/SideshowBob.gif"
    },
    {
        question: "Who shot Mr Burns?",
        choices: ["Homer", "Maggie","Smithers", "Barney"],
        answer: 1,
        photo: "assets/images/Maggie.gif"
    },
    {
        question: "What NFL team is given to Homer by Hank Scorpio?",
        choices: ["The Broncos", "The Cowboys", "The Jets", "The 49ers"],
        answer: 0,
        photo: "assets/images/Broncos.gif"
    },
    {
        question: "What did Lionel Hutz change his name to?",
        choices: ["Philip McNeille", "Daniel Cartright", "Cowboy Steve", "Miguel Sanchez"],
        answer: 3,
        photo: "assets/images/MiguelSanchez.gif"
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
    $("#start").on("click", function (){
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
        
        // Time runs out
        if (timer === 0){
            skipped++;
            stop();
            $("#answers").html("<p>Out of time! Correct answer is: " + pick.choices[pick.answer] + "</p>");
        }
    }

    // Displaying the questions //
    
    function displayQuestion(){
        //generate random index in trivia question array
        index = Math.floor(Math.random()*triviaQuestions.length);
        pick = triviaQuestions[index];

        $("#questions").html("<h2>" + pick.question + "</h2>");
    }
    // Picking answers //
    // On click event

    // Timer = 0 //
    // Timer stop
    // Time is up message
    // Display correct answer
    // Skip count up
    // Show picture

    // If right //
    // Timer stop
    // Correct message
    // Win count up
    // Show picture

    // Else wrong //
    // Timer stop
    // Wrong message
    // Display correct answer
    // Wrong count up
    // Show picture


    // Game end function //
    // Timer stop
    // Show right/wrong/skipped count
    // Play again?
    // Reset game on click
})