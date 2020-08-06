
var dictCode = 'french-english'
var card = document.getElementsByClassName("thecard")[0];
var front = document.getElementsByClassName("front")[0];
var back = document.getElementsByClassName("back")[0];
var runButton = document.getElementById("runButton");
var PrevButton = document.getElementById("PrevButton");
var NextButton = document.getElementById("NextButton");
var listOfTermsBox = document.getElementById("listOfTermsBox");
var arrayOfWords = [];
var arrayOfDefinitions = [];
var currentWordIndex = 0;
var cardDefinitionShowing = false;

  
const getDefinition = async (word) => {
    const response = await fetch(`https://sl4vamtcsj.execute-api.us-east-2.amazonaws.com/prod/search?word=${word}`);
    const json = await response.json();
    arrayOfDefinitions.push(json.definition);
}


async function updateArrayOfDefinitions(wordList){
    arrayOfDefinitions = [];
    //look up definition of words in wordList
    for(i = 0; i<wordList.length; i++) {
        // var definition = await getDefinition(wordList[i]).definition
        await getDefinition(wordList[i])
        // arrayOfDefinitions.push(definition);
    }
}

async function runButtonFunction() {
    $( "#front" ).html("searching...");
    $( "#back" ).html("searching...");
    var wordList = listOfTermsBox.value.split(" ");
    if(wordList[0] != "") {
        currentWordIndex = 0;
        updateArrayOfWords(wordList);
        await updateArrayOfDefinitions(wordList);
        putWordsInBox(wordList);
        // changeTerm();
    }
}


front.addEventListener("click", function(){
    flipCardAnimation();
});
back.addEventListener("click", function(){
    flipCardAnimation();
});

runButton.addEventListener("click", () => {
    runButtonFunction().then((data) => changeTerm())
});

PrevButton.addEventListener("click", function() {
    updateFlashcard("ArrowLeft");
});
NextButton.addEventListener("click", function() {
    updateFlashcard("ArrowRight");
});

document.addEventListener('keydown', function(event) {
    if(event.target !== document.getElementById("listOfTermsBox")){
        const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
        updateFlashcard(key);
    }

});


function flipCardAnimation() {
    if(cardDefinitionShowing == false) {
        card.style.transform = "rotateY(180deg)";
        cardDefinitionShowing = true;
    }
    else if(cardDefinitionShowing == 1) {
        card.style.transform = "rotateY(0deg)";
        cardDefinitionShowing = false;
    }
}

function resetCardAnimation() {
    cardDefinitionShowing = false;
    card.style.transform = "rotateY(0deg)";
}

function changeTerm() {
    $( "#front" ).html(arrayOfWords[currentWordIndex]);
    // document.getElementById("front").innerHTML = arrayOfWords[currentWordIndex]; // Changes the front
    $( "#back" ).html(arrayOfDefinitions[currentWordIndex]);; // Changes the front
    
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
    arrayOfWords = []
    for(i = 0; i<wordList.length; i++) {
        arrayOfWords.push(wordList[i]);
    }
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


