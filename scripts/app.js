const app = {};

// get questions from API 
app.getQuestions = function(){
   $.ajax({
      url: `https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple`,
      method: 'GET',
      dataType: 'json',
   }).then(res => {
      console.log(res);
   });
};

app.init = function(){
   app.getQuestions();
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