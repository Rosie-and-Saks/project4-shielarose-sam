// USER STORY :
// User selects desired category 
// A list of 10 of questions appear one by one 
// User selects a multiple choice answer
// User is notified if their answer is correct or incorrect 
// User selects option to see their results at the end of the 10-question quiz.
// User selects option to play again (select another category)

const app = {};

// CORE VARIABLES IN PLAY:

// tracking the user's score
app.score = 0;

//question counter
app.questionCount = 0;

// user answer choice
app.userAnswer;

// stores the index of correct answer in an answer array
app.correctAnswerIndex;

// changes to true once user selects an answer
app.answerQuestion = false;


// get questions from API 
app.getQuestions = function(category){
   $.ajax({
      url: `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=medium&type=multiple`,
      method: 'GET',
      dataType: 'json',
   }).then(res => {
       app.updateQuestion(res.results);

//prevent default on the 'next' submit button, listen for click to go to next question
       $(".next").on("click", function (e) {
           e.preventDefault();
//update question counter on quiz, tracking to 10
           if (app.questionCount < 9) {
               app.questionCount++;
               app.updateQuestion(res.results);
               $(".question-tracker span").html(app.questionCount + 1);
           }
//change the next button to a 'see results' once user reaches 10 questions
           if (app.questionCount === 9) {
                $(".next").addClass("hidden");
                $(".see-results").removeClass("hidden");
           }  
// re-assign the variable to false so the user is NOT able to click on another answer
           app.answerQuestion = false;
       })

//listen for when user clicks on 'show results' button:
       $(".see-results").on("click", function(e) {
           e.preventDefault();
           app.showResult();
       })
   });
};

 //function to show results when user clicks on the 'show results' button:
 app.showResult = function() {
     $(".results").removeClass("hidden");
     if (app.score === 10) {        
         $(".results-box").append(`<div class="clear"><p>OMG, you are the ultimate Smartypants! You scored ${app.score} out of 10. Great job!!!</p></div>`);
         $(".results-box").append(`<img src="assets/smartypants-champ.png" alt="cartoon jeans holding a championship belt and wearing a crown" class="results-image-champ"></img>`);

     } else if (app.score > 6 && app.score < 10) {
         $(".results-box").append(`<div class="clear"><p>Great job, Smartypants! You scored ${app.score} out of 10!</p></div>`);
         $(".results-box").append(`<img src="assets/SmartyPants.png" alt="cartoon jeans wearing glasses" class="results-image"></img>`);

     } else {        
         $(".results-box").append(`<div class="clear"><p>You scored ${app.score} out of 10. Better luck next time, little buddy!</p></div>`);
         $(".results-box").append(`<img src="assets/sad-smartypants.png" alt="cartoon jeans with a sad face and teardrop" class="results-image"></img>`);
     }
 }
 
// listen for user to click on a category, pull array of questions corresponding to category from API
app.listenForChange = function(){
   $(".category-name").on("click", function(){
      app.chosenCategory = $(this).val();
      app.getQuestions(app.chosenCategory);
      $(".categories").fadeOut();
      $(".question-container").fadeIn();
      $(".question-form").removeClass("hidden");
      app.questionCount = 0;
      app.score = 0;
      $(".clear").empty();
      $(".answer-bottom").html(`
        <div class="question-tracker"><span>1</span>/10</div>
        <button class="next">Next</button>
        <button class="hidden see-results">See Results</button>`);
   });
};

//function to reset the quiz
app.playAgain = function() {
    $("#play-again").on("click", function() {
        location.reload(true);
    })
};


//function to display quiz question/multiple choices on page when user selects category:
app.updateQuestion = function(question){
// Create an array of all the answers
   app.answers = [];

// create a variable for the correct answer:
   app.correctAnswer = question[app.questionCount].correct_answer;
   $(".answers").empty();

// push the incorrect answers into the new answer array:
   question[app.questionCount].incorrect_answers.forEach(answer => {
      app.answers.push(answer)
   });

// put the correct answer into the new answer array in a random position:
   app.answers.splice(Math.floor(Math.random() * 4), 0, app.correctAnswer);

// track the index of the correct answer:
   app.correctAnswerIndex = app.answers.indexOf(app.correctAnswer);

//display the questions and answers onto the DOM, one at a time:
   $(".question").html(question[app.questionCount].question);
       
   for (let i = 0; i < app.answers.length; i++){
//display label elements (i.e. answer options)
       $(".answers").append(`<label for="${app.answers[i]}"  data-index="${i}" class="answer-option">${app.answers[i]}</label>`);
      
//create input elements
      $(".answers").append(`<input type="radio" id="${app.answers[i]}" class="visuallyhidden" name="answer">`);
   };
   
//listen for click of answer option label, check if user's answer is correct or incorrect
   $(".answer-option").on("click", function () {
       if(app.answerQuestion == false) {
           app.userAnswer = $(this).data('index');
           if (app.userAnswer == app.correctAnswerIndex) {
               $(this).addClass("correct");
               app.score++;
               $(".answers").prop("disabled", true);
            } else {
                $(this).addClass("incorrect");
                $(`.answer-option[data-index=${app.correctAnswerIndex}]`).addClass("correct");
                $(".answers").prop("disabled", true);
            }

            app.answerQuestion = true;
       }
   });
 };


app.init = function(){
   app.listenForChange();
   app.playAgain();

};

$(function(){
    app.init();

//smooth scroll on 'play now' button:
    $("a").on("click", function (e) {
        if (this.hash !== "") {
            e.preventDefault();
            const hash = this.hash;
            $("html, body").animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                window.location.hash = hash;
            });
        }
    });

});



