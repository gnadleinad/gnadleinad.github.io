// var express = require("express");
// var app = express();

var card = document.getElementsByClassName("thecard")[0];
var front = document.getElementsByClassName("front")[0];
var back = document.getElementsByClassName("back")[0];
var runButton = document.getElementById("runButton");
var PrevButton = document.getElementById("PrevButton");
var NextButton = document.getElementById("NextButton");
var listOfTerms = document.getElementById("listOfTerms");
var arrayOfWords = [];
var arrayOfDefinitions = [];
var currentWordIndex = 0;
var face = 0;


front.addEventListener("click", function(){
    flipCardAnimation();
});
back.addEventListener("click", function(){
    flipCardAnimation();
});

runButton.addEventListener("click", function() {
    var wordList = listOfTerms.value.split(" ");
    if(wordList[0] != "") {
        currentWordIndex = 0;
        putWordsInBox(wordList);
        updateArrayOfWords(wordList);
        updateArrayOfDefinitions(wordList);
        changeTerm();
        console.log(wordList.length)
    }
});

PrevButton.addEventListener("click", function() {
    updateFlashcard("ArrowLeft");
});
NextButton.addEventListener("click", function() {
    updateFlashcard("ArrowRight");
});

document.addEventListener('keydown', function(event) {
    const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
    updateFlashcard(key);
});

function flipCardAnimation() {
    if(face == 0) {
        card.style.transform = "rotateY(180deg)";
        face = 1;
    }
    else if(face == 1) {
        card.style.transform = "rotateY(0deg)";
        face = 0;
    }
}
function resetCardAnimation() {
    face = 0;
    card.style.transform = "rotateY(0deg)";
}

function changeTerm() {
    $( "#front" ).html(arrayOfWords[currentWordIndex]);
    // document.getElementById("front").innerHTML = arrayOfWords[currentWordIndex]; // Changes the front
    $( "#back" ).html(arrayOfWords[currentWordIndex]);; // Changes the front
    
    //Change the back of the card
    //make word bold
}
function updateFlashcard(key) {
    if(key == "ArrowRight") {
        if (currentWordIndex < arrayOfWords.length-1) {
            currentWordIndex = currentWordIndex + 1;
            changeTerm();
            resetCardAnimation();
        }
    }
    else if (key == "ArrowLeft") {
        if (currentWordIndex > 0) {
            currentWordIndex = currentWordIndex - 1;
            changeTerm();
            resetCardAnimation();
        }
    }
    else if (key == " ") {
            flipCardAnimation();
    }

}
function updateArrayOfWords(wordList) {
    arrayOfWords = [];
    for(i = 0; i<wordList.length; i++) {
        arrayOfWords.push(wordList[i]);
    }
}
function updateArrayOfDefinitions(wordList){
    //look up definition of words in wordList
    arrayOfDefinitions = [];
}

function putWordsInBox(wordList) {
    document.getElementById("empty").innerHTML = "";
    var ul = document.createElement('ul');
    document.getElementsByClassName('overflow-auto')[0].appendChild(ul);
    wordList.forEach(function(item) {
        let li = document.createElement('li');
        ul.appendChild(li);
        li.innerHTML += item;
    });
};

//turn off spacebar scrolling!
// window.onkeydown = function(e) { 
//     return !(e.keyCode == 32);
//   };



