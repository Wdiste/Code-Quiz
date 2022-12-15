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
var bttnEl = document.querySelector('.options-list');
var timer;

// retrieve highscore name array from localData to update it 
// parse that JSON or the array of names wont save 
// var highscoresNameList = [];
highscoresNameList = JSON.parse(localStorage.getItem('highscoresNameList'));

// !!!!!!! without this code, the name list will default to null and wont populate
if (highscoresNameList === null) {
    highscoresNameList = [];
}
// !! same here with the score
var highScoreCount = JSON.parse(localStorage.getItem('highScoreCount'));
console.log('high', highScoreCount)
if (highScoreCount === null) {
    highScoreCount = 0;
}

// array of objects with information for the questions/answers
var quizContent = [
    {
        question: "What is the correct HTML element for the largest heading?",
        Answers: [
            '<div>',
            '<h1>',
            '<body>',
            '<heading_large>'
        ],
        correctAnswer: '<h1>',
    },
    {
        question: "How can you make a bulleted list?",
        Answers: [
            '<ol>',
            '<a>',
            '<ul>',
            '<span>'
        ],
        correctAnswer: '<ul>',
    },
    {
        question: 'To access an HTML element from JavaScript, you can use this method',
        Answers: [
            'getElementById()',
            'giveMeHTML()',
            'retrieveElementPlease()',
            'Java.getScript(element.id)'
        ],
        correctAnswer: 'getElementById()',
    },
    {
        question: 'Single line comments stat with this',
        Answers: [
            '//',
            '>>>>>>>',
            'Comment-here=',
            '<comm>'

        ],
        correctAnswer: '//',
    },
    {
        question: 'This is used to declare a javascript variable',
        Answers: [
            'jvariable',
            'number =',
            'declare(var)',
            'var',
        ],
        correctAnswer: 'var',
    }
];

// count of quiz questions answered
var count = 0;

// start the game on button click
startBtn.addEventListener('click', function (event) {
    event.preventDefault();
    startGame();
    return;
});



function startGame() {
    // hide instructions when quiz starts
    hideTxt.textContent = '';
    startBtn.style.display = 'none';
    var score = 0;

    // send the count and score variables to keep the values updated
    renderQuiz(count, score);
};

function renderQuiz(count, score) {
    // make question appear on screen.  access quizContent array element
    // 'question' via 'count' global var

    // count is universal so we know when to stop, regardless of how many times checkAnswer calls the function
    if (count < 5) {
        clearInterval(timer);
        startTimer()
        questionHead.textContent = 'Question ' + i + ': ' + quizContent[count].question;

        for (var i = 0; i < 4; i++) {
            var buttonList = document.createElement('ul');
            var button = document.createElement('button');
            button.type = 'button';
            button.textContent = quizContent[count].Answers[i];
            buttonList.appendChild(button);
            bttnEl.appendChild(buttonList);
        };
    } else {    // At the end of game (count iterations) will send user to highscores
        logHighScore(score);
        return;
    };
    checkAnswer(count, score);
};

function checkAnswer(count, score) {
    bttnEl.addEventListener('click', function (event) {
        var selectedAnswer = event.target.textContent;
        console.log(selectedAnswer);

        // checks the button pressed's text area against the correct answer element
        if (selectedAnswer == quizContent[count].correctAnswer) {
            score++;
            console.log(score);
        };
        // record another iteration, clean the area, play the quiz again
        // make sure to pass along the variables, they dont like to work globally sometimes
        count++;
        init();
        renderQuiz(count, score);
    })
};

function init() {
    questionHead.textContent = '';

    bttnList.removeChild(bttnEl);
    bttnEl = document.createElement('ul');
    bttnEl.className = 'options-list';
    bttnList.appendChild(bttnEl);
};

function logHighScore(score) {
    // clean up page 
    init();

    // build a prompt on page to enter name for score save
    var scoreSubmit = document.querySelector('.highscore-submit');

    questionHead.textContent = 'Well done!, your score is: ' + score;

    // input for name linked to high score
    var playerName = document.createElement('input');
    playerName.className = 'score-name';
    playerName.type = 'text';
    playerName.placeholder = 'Enter player name: ';

    // append to the high score placeholder of HTML
    scoreSubmit.appendChild(playerName);

    // submit button for input
    var submitBtn = document.createElement('button');
    submitBtn.textContent = 'Submit';
    submitBtn.type = 'submit';
    submitBtn.className = 'score-name';

    // again, append to the high score section of HTML
    scoreSubmit.appendChild(submitBtn);

    // Upon submit, redirect page to highscores HTML
    submitBtn.addEventListener('click', function (event) {
        event.preventDefault();
        console.log(event.target);

        // increase the highScoreCount on both pages
        highScoreCount++;


        // save names in array then pass to the localdata for matchup with key 
        highscoresNameList.push(playerName.value);

        localStorage.setItem('highScoreCount', highScoreCount);
        localStorage.setItem(playerName.value, score);
        localStorage.setItem('highscoresNameList', JSON.stringify(highscoresNameList));
        window.location.replace('./highscores.html');

    });
};

function startTimer() {
    var timerText = document.querySelector('.timer');
    var value = false;
    let seconds = 10;

    timer = setInterval(function(){
        seconds--;

        timerText.textContent = seconds;
        if(seconds == 0){
            clearInterval(timer);
            timerText.textContent = '';
            init();
            value = true;
            questionHead.textContent = 'Time\'s up!';
        };
    }, 1000);

    return value;
}