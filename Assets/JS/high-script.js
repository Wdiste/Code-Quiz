var highEl = document.querySelector("#highscores-element");

var highScoreCount = localStorage.getItem('highScoreCount');
var highscoresNameList = [];

highscoresNameList = JSON.parse(localStorage.getItem('highscoresNameList'));
console.log(highscoresNameList);

for (let i = 0; i < highscoresNameList.length; i++) {
    // create name and score text elements
    let newRow = document.createElement('tr');
    var newName = document.createElement('td');
    var newScore = document.createElement('td');


    // add row to the table
    highEl.appendChild(newRow);

    // add name to the text area using the element of the array of saved names
    newName.textContent = highscoresNameList[i];
    newName.className = 'hsEl';
    newRow.appendChild(newName);

    // add name to the text area using the element of the data of saved scores
    newScore.textContent = localStorage.getItem(highscoresNameList[i]);
    newScore.className = 'hsEl';
    newRow.appendChild(newScore);
};