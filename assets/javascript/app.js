$(document).ready(function() {

	// Global variables
	var layout = $(".game-area");
	var timerStartNumber = 20;

// ==========================================================================================================
	// Click events
	$(document).on("click", "#start", function () {
		$("#subcontainer").prepend('<h3>Time Remaining: <span id="timer-count">20</span> seconds</h3>');
		game.showQuestion();
	});

	$(document).on('click', '.answer-button', function(event) {
  		game.clicked(event);
	});

	$(document).on('click', '#start-over', function() {
  		game.reset();
	});

	// Array with all the questions for trivia game
	var questions = [{
		question: "Which of these is not one of the main characters on The Big Bang Theory?",
		answers: ["Sheldon", "Leonard", "Rajesh", "Howard", "John"],
		rightAnswer:"John",
		image:"assets/images/",
	}, {
		question: "Which character is an Astrophysicist?",
		answers: ["Leonard", "Sheldon", "Raj", "Penny"],
		rightAnswer:"Raj",
		image:"assets/images/",
	}, {
		question: "Which character is a theoretical physicist?",
		answers:["Howard", "Leonard", "Sheldon","Raj"],
		rightAnswer:"Sheldon",
		image:"assets/images/",
	},	{
		question: "For the firxt six seasons who couldn't speak to girls without being drunk?",
		answers: ["Sheldon", "Leonard", "Raj", "Howard"],
		rightAnswer:"Raj",
		image:"assets/images/",
	},	{
		question: "Which character has a PhD in neurobiology and frequently uses monkeys in research and experiments?",
		answers: ["Penny", "Sheldon", "Amy", "Stuart"],
		rightAnswer:"Amy",
		image:"assets/images/",
	},	{
		question: "Which character is an aerospace engineer?",
		answers: ["Stuart", "Howard", "Bernadette", "Amy"],
		rightAnswer:"Howard",
		image:"assets/images/",
	},	{
		question: "Who dated a North Korean spy?",
		answers: ["Sheldon", "Raj", "Leonard", "Howard"],
		rightAnswer:"Leonard",
		image:"assets/images/",
	},	{
		question: "Who lived with Howard's mother before she died?",
		answers: ["Raj", "Howard", "Penny", "Stuart"],
		rightAnswer:"Stuart",
		image:"assets/images/",
	},	{
		question: "Who starred in 'Serial Ape-ist' and then made the sequel with Wil Wheaton?",
		answers: ["Leonard", "Penny", "Amy", "Sheldon"],
		rightAnswer:"Penny",
		image:"assets/images/",
	},	{
		question: "Who was Sheldon's roommate?",
		answers:["Howard", "Raj", "Leonard", "Amy"],
		rightAnswer:"Leonard",
		image:"assets/images/",
	}];

	// When game starts, set values to 0
	var game = {
		questions:questions,
		currentQuestion:0,
		timer:timerStartNumber,
		correct:0,
		incorrect:0,

		// Function for timer count down starting at 20 and decrease by 1 second
		timerCountDown: function(){
			game.timer--;
			$('#timer-count').html(game.timer);
			console.log(game.timer);

			// If timer reaches 0, call function timeUp
			if (game.timer === 0){
				game.timeUp();
			}
		},
		// Function for when timer reaches 0, it clears interval and displays the correct answer
		timeUp: function(){
			clearInterval(timer);
			layout.html('<h2> Out of Time!</h2>');
			layout.append('<h3> The correct answer was: ' + questions[this.currentQuestion].rightAnswer + '</h3>');

			if (game.currentQuestion === questions.length - 1) {
				setTimeout (game.results, 3000);
			}
				else {
					setTimeout (game.nextQuestion, 3000);
				}
		},

		// Function to show question when start button is clicked 
		showQuestion: function(){
			timer = setInterval(game.timerCountDown, 1000);
			layout.html('<h2>' + questions[this.currentQuestion].question + '</h2');
			for (var i = 0; i < questions[this.currentQuestion].answers.length; i++){
				layout.append('<button class="answer-button"' + 'data-name="' + questions[this.currentQuestion].answers[i] + '">' + questions[this.currentQuestion].answers[i] + '</button>');
			}
		},
		// Function so next question comes up after previous question has been answered 
		nextQuestion: function(){
			game.timer = timerStartNumber;
			$("#timer-count").html(game.timer);
			game.currentQuestion++;
			game.showQuestion();
		},

		clicked: function(event){
			clearInterval(timer);

			if ($(event.target).data("name") === questions[this.currentQuestion].rightAnswer){
				this. correctAnswer();
			}
			else {
				this. incorrectAnswer();
			}
		},

		// Function to check if the right answer was chosen, if so add tally to results
		correctAnswer: function(){
			clearInterval (timer);
			game.correct++;
			layout.html('<h2> You got it!</h2>');

			if (game.currentQuestion === questions.length - 1) {
				setTimeout (game.results, 3000);
			}
				else {
					setTimeout (game.nextQuestion, 3000);
				}
		},

		// Function for incorrect answer chosen, add tally to results
		incorrectAnswer: function(){
			clearInterval (timer);
			game.incorrect++;
			layout.html('<h2> Nope!</h2>');
			layout.append('<h3> The correct answer was: ' + questions[this.currentQuestion].rightAnswer + '</h3>');

			if (game.currentQuestion === questions.length - 1) {
				setTimeout (game.results, 3000);
			}
				else {
					setTimeout (game.nextQuestion, 3000);
				}
		},

		//Shows player's results and give option to play game again
		results: function(){
			clearInterval(timer);

			layout.html('<h2> You are done! This is how you did: </h2');
			layout.append('<h3> Correct answers: ' + game.correct + '</h3>');
			layout.append('<h3> Incorrect answers: ' + game.incorrect + '</h3>');
			layout.append('<h3> Unanswered: ' + (questions.length - (game.correct + game. incorrect)) + '</h3>');
			layout.append('<br><button id="start-over">Start Over?</button>');
		},

		// Resets game to first question
		reset: function(){
			this.currentQuestion = 0;
    		this.timer = timerStartNumber;
    		this.correct = 0;
    		this.incorrect = 0;
			this.showQuestion();
		},
		
	};

})