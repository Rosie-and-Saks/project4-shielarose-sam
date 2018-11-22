const app = {};

// get questions from API 
app.getQuestions = function(category){
   $.ajax({
      url: `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=medium&type=multiple`,
      method: 'GET',
      dataType: 'json',
   }).then(res => {
      // console.log(res.results);
      // app.chosenCategory(res.results)
      app.displayQuestion(res.results)
   });
};


// Listen for when user clicks on a category and pull the array of questions relating to that category from API
app.listenForChange = function(){
   $(".category-name").on("click", function(){
      app.chosenCategory = $(this).val();
      app.getQuestions(app.chosenCategory);
   });
};

// Display questions on page
app.displayQuestion = function(questionContainer){
   $("#question-container").empty();
   questionContainer.forEach((questionObject) => {
      app.question = $("<h3>").addClass("question-heading").html(questionObject.question);
      app.correctAnswer = $("<ul><li>").html(questionObject.correct_answer);
      app.incorrectAnswers = $("<li>").html(questionObject.incorrect_answers);
      app.completeQuestion = $("<div>").addClass("complete-question").append(app.question, app.correctAnswer, app.incorrectAnswers);
      $("#question-container").append(app.completeQuestion);
      });
};


      
      

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