const app = {};

// main variables
// counts user score
app.score = 0;

//question counter
app.questionCount = 0;

// user answer choice
app.userAnswer;

// stores the index of correct answer in answer array
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
       $(".next").on("click", function (e) {
            //remove default settings of the 'next' submit button, listen for click to go to next question
           e.preventDefault();
            //update question count on quiz going up to 10, and update question tracker
           if (app.questionCount < 9) {
               app.questionCount++;
               app.updateQuestion(res.results);
               $(".question-tracker span").html(app.questionCount + 1);
           } else {
               app.showResult();
           } 
           // re-assign the variable to false so the user is able to click on another answer
           app.answerQuestion = false;            
       })
   });
};

 //after the last click (when quiz reaches 10), show results

 app.showResult = function() {
     $(".results").removeClass("hidden");
     if (app.score >= 8) {
         $(".results-box").append(`<div class="clear"><p>Great job, Smartypants! You scored ${app.score} out of 10!</p></div>`)
     } else {
         $(".results-box").append(`<div class="clear"><p>You only scored ${app.score} out of 10, better luck next time, little buddy!</p></div>`)
     }
 }
 
// Listen for when user clicks on a category and pull the array of questions relating to that category from API
app.listenForChange = function(){
   $(".category-name").on("click", function(){
      app.chosenCategory = $(this).val();
      app.getQuestions(app.chosenCategory);
      $(".categories").fadeOut();
      $(".question-container").fadeIn();
      app.questionCount = 0;
      app.score = 0;
      $(".clear").empty();
      $(".answer-bottom").html(`
        <div class="question-tracker"><span>1</span>/10</div>
        <button class="next">Next</button>`);
   });
};

app.playAgain = function() {
    $("#play-again").on("click", function() {
        $(".categories").fadeIn();
        $(".question-container").fadeOut();
        $(".results").addClass("hidden");
    })
};


//once they select a category, put questions/answers on page
app.updateQuestion = function(question){
    // Create an array of all the answers
    app.answers = [];

// Create a variable for the correct answer
   app.correctAnswer = question[app.questionCount].correct_answer;
   $(".answers").empty();

// Push the individual incorrect answers into the new answer array
   question[app.questionCount].incorrect_answers.forEach(answer => {
      app.answers.push(answer)
   });

// Add the correct answer into the new answer array at a random index
   app.answers.splice(Math.floor(Math.random() * 4), 0, app.correctAnswer);

// Track the index of the correct answer
   app.correctAnswerIndex = app.answers.indexOf(app.correctAnswer);

//Append questions and answers to the DOM
   $(".question").html(question[app.questionCount].question);
       
   for (let i = 0; i < app.answers.length; i++){
      //create label elements
       $(".answers").append(`<label for="${app.answers[i]}"  data-index="${i}" class="answer-option">${app.answers[i]}</label>`);
      
      // //create input elements
      $(".answers").append(`<input type="radio" id="${app.answers[i]}" name="answer">`);
   };
   
//on click of answer label, check if user's answer is correct or incorrect
   $(".answer-option").on("click", function () {
       if(app.answerQuestion == false) {
           app.userAnswer = $(this).data('index');
           console.log(app.userAnswer, app.correctAnswerIndex);
           
           if (app.userAnswer == app.correctAnswerIndex) {
               console.log ("CORRECT!!!!");
               $(this).addClass("correct");
               app.score++;
               //    console.log(app.score);
               $(".answers").prop("disabled", true);
            } else {
                console.log ("INCORRECT");
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
});


// USER STORY 
// User selects desired category 
// A list of 10 of questions appear one by one 
// User selects a multiple choice answer
// User is notified if their answer is correct or incorrect 
// Their score is updated dynamically 
// User is shown score along with the correct answers to all questions at the end of the quiz

//PSEUDO CODE
// Get questions from the different categories from API

// On click of a topic, the respective questions are pulled from the array 

// Questions appear on the page one by one

// Once user selects an answer, user can no longer change their answer
// If user answers correctly, a green checkmark will appear beside the answer
// If user answers incorrectly, a red x will appear beside their selection and a green checkmark will appear beside the correct answer

// Question tracker will show user what question they're on 
// Question tracker will increase by one every time the "next" button is clicked

// After all questions have been answered, a results pop-up appears with final score
// Create a function to calculate and display final score 