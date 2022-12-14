var highName = document.querySelector("#highscores-name");
var highScore = document.querySelector('#highscores-scores');


var highScoreCount = localStorage.getItem('highScoreCount');
var highscoresNameList = [];

highscoresNameList = JSON.parse(localStorage.getItem('highscoresNameList'));
console.log(highscoresNameList);

for (let i = 0; i < highscoresNameList.length; i++) {
    // create name and score text elements
    var newName = document.createElement('li');
    var newScore = document.createElement('li');

    // add name to the text area using the element of the array of saved names
    newName.textContent = highscoresNameList[i];
    highName.appendChild(newName);

    // add name to the text area using the element of the data of saved scores
    newScore.textContent = localStorage.getItem(highscoresNameList[i]);
    highScore.appendChild(newScore);
};