const app = {};

// main variables
// counts user score
app.score = 0;

//question counter
app.questionCount = 0;

// user answer choice
app.userAnswer;

// stores index of correct answer in answer array
// if correctAnswerIndex == userAnswer, score increases by 1
app.correctAnswerIndex;


// get questions from API 
app.getQuestions = function(category){
   $.ajax({
      url: `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=medium&type=multiple`,
      method: 'GET',
      dataType: 'json',
   }).then(res => {
      // console.log(res.results);
      // app.chosenCategory(res.results)
      // app.displayQuestion(res.results)
      app.updateQuestion(res.results);

   });
};


// Listen for when user clicks on a category and pull the array of questions relating to that category from API
app.listenForChange = function(){
   $(".category-name").on("click", function(){
      app.chosenCategory = $(this).val();
      app.getQuestions(app.chosenCategory);
   });
};



// // Display questions on page
// app.displayQuestion = function (questionContainer) {
//    $("#question-container").empty();
//    questionContainer.forEach((questionObject) => {
//       app.question = $("<h3>").addClass("question-heading").html(questionObject.question);
//       // app.rightAnswer = $("<li>").html(questionObject.correct_answer);
//       // app.wrongAnswers = $("<li>").html(questionObject.incorrect_answers);
//       app.completeQuestion = $("<div>").addClass("complete-question").append(app.question, app.correctAnswer, app.incorrectAnswers);
//       $("#question-container").append(app.completeQuestion);
//    });
// };

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

   $(".answer-option").on("click", function () {
       app.userAnswer = $(this).data('index');
       console.log(app.userAnswer, app.correctAnswerIndex);

       if (app.userAnswer == app.correctAnswerIndex) {
           console.log ("CORRECT!!!!");
           $(this).addClass('correct');
           $("fieldset").prop("disabled", true);
       } else {
           console.log ("The price is wrong, bitch!");
           $(this).addClass('incorrect');
           $(".answer-option").find(`[data-index='${app.correctAnswerIndex}'`).addClass('correct');
           $("fieldset").prop("disabled", true);

       }

   });






//    console.log(app.answers);

 };



// Spread the incorrect answers out

// Create a new array of answers
// Push the correct answer into the new array of answers at a random index 


      
      

app.init = function(){
   app.listenForChange();
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