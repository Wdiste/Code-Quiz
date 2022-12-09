// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and my score

//  ---------  Psuedo  ---------
//
// I click the start button
// --> the game starts
// ------> the timer starts
// ----------> if timer hits (0) 
// --------------> go through incorrect answer code
// ------> a question appears on screen
// ------> 4 answer buttons appear on screen
// I click on an answer
// --> the answer is logged
// --> result (right/wrong) is counted
// ------> if wrong, subtract 10 seconds from the clock
// --> result (right/wrong) is flashed under answers
// --> another answer is shown
// I finish the quiz
// --> highscore page is shown
// ------> your score is shown
// ------> form with name to save score
// --> previous highscores are shown
// --> clear highscores button is shown

var startBtn = document.querySelector('#start-button');
var questionHead = document.querySelector('#question-line');
var hideTxt = document.querySelector('#rules');
var bttnList = document.querySelector('.options');

var questions = [
    "What is the correct HTML element for the largest heading?",
    "How can you make a bulleted list?",
    'To access an HTML element from JavaScript, you can use this method',
    'Single line comments stat with this',
    'This is used to declare a javascript variable'
];

var answers = [
    "<h1>",
    "<ul>",
    'getElementById()',
    '//',
    'var'
];

startBtn.addEventListener('click', function(event) {
    event.preventDefault();
    startGame();
    return;
});





function startGame() {
    hideTxt.textContent = '';

    for(var i = 0; i < questions.length; i++){
        questionHead.textContent = 'Question ' + i + ': ' + questions[i];
    };
};