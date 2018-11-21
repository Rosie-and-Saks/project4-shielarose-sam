const app = {};

// Category numbers
app.generalKnowledge = 9;
app.books = 10;
app.film = 11;
app.music = 12;
app.tv = 14;
app.science = 17;
app.sports = 21;
app.geography = 22;
app.his = 23;
app.politics = 24;
app.art = 25;
app.celebs = 26;
app.animals = 27;

// Difficulty type
app.easy = 'easy';
app.med = 'medium';
app.hard = 'hard';

// get questions from API 
app.getQuestions = function(category, difficulty){
   $.ajax({
      url: `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`,
      method: 'GET',
      dataType: 'json',
   }).then(res => {
      // console.log(res.results);
   });

};

$(".category-type").on("change", function(){
   app.userCategoryChoice = $(".category-type:checked");
   app.getQuestions(app.userCategoryChoice, app.med);
});
// // MEDIUM QUESTIONS
// app.getQuestions(app.generalKnowledge, app.med);
// app.getQuestions(app.books, app.med);
// app.getQuestions(app.film, app.med);
// app.getQuestions(app.music, app.med);
// app.getQuestions(app.tv, app.med);
// app.getQuestions(app.science, app.med);
// app.getQuestions(app.sports, app.med);
// app.getQuestions(app.geography, app.med);
// app.getQuestions(app.his, app.med);
// app.getQuestions(app.politics, app.med);
// app.getQuestions(app.celebs, app.med);
// app.getQuestions(app.animals, app.med);


app.init = function(){
   // app.getQuestions();
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