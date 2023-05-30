(function() {
    "use strict";

    const STARTING_VAL = 0;
    const LOSING_VAL = 3;
    let incorrectNum = 0;
    let corIndex = 0;
    let incIndex = 0;
    let notFound = 0;
    let found = 1;
    let flag = 0;
    let increment = 1;
    let flag2 = 1;
    let correctLetters = new Array();
    let incorrectLetters = new Array();
    let corrWord;


    function init() {
        fetchData();
        id("letter-btn").addEventListener("click", checkLetter);
        id("word-btn").addEventListener("click", checkAns);
        id("new-btn").addEventListener("click", newWord);
        id("hint-btn").addEventListener("click", hintDisplay);
    }

    function fetchData() {
        let url = "https://dog.ceo/api/breeds/list/random";
        fetch(url)
            .then(checkStatus)
            .then(response => response.json())
            .then(processResponse)
            .then(data => {
                corrWord = data;
            })
            .then(() => {
                console.log(corrWord);
            })
            .catch(handleError);
    }
    
    function processResponse(data) { 
        return data.message;
    }
    
    function checkStatus(response) {
        if (!response.ok) {
            throw Error("Error in request: " + response.statusText);
        }
        return response;
    }

    function handleError() {
        console.log("There is an error with the API. Please try again later!");
    }
    
    function hintDisplay() {
        id("num-letters").textContent = corrWord.length + " letters";
    }
    
    function checkLetter() {
        let inputVal = id("letter").value;
        let inputLength = inputVal.length;
        if (inputLength > increment) {
            id("letter").value = "";
        } else if (inputLength == found) {
            if (correctLetters.includes(inputVal) || incorrectLetters.includes(inputVal)) {
                id("letter").value = "";
            } else {
                for (let i = 0; i < corrWord.length; i++) {
                    if (inputVal == corrWord[i]) {
                        flag = found;
                        id("corr-letters").textContent += inputVal + " ";
                    }
                }
                if (flag == found && correctLetters.includes(inputVal) == false) {
                    correctLetters[corIndex] = inputVal;
                    corIndex += increment;
                }
                if (flag == notFound) {
                    id("incorr-letters").textContent += inputVal + " ";
                    incorrectLetters[incIndex] = inputVal;
                    incIndex += increment;
                }
            }
        }
        flag = notFound;
        id("letter").value = "";
    }

    function checkAns() {
        flag2 = found;
        id("letter").value = "";
        let inputVal = id("word").value;
        let inputLength = inputVal.length;
        if (inputLength != corrWord.length) {
            incorrectNum += found;
            flag2 = notFound;
            id("incorr-guess").textContent = incorrectNum;
            id("word").value = "";
            if (incorrectNum == LOSING_VAL) {
                displayLose();
                resetHelper();
                incorrectNum = STARTING_VAL;
            }
        } else if (inputLength == corrWord.length) {
            for (let compIndex = 0; compIndex < inputLength; compIndex++)
                if (inputVal[compIndex] != corrWord[compIndex]) {
                    flag2 = notFound;
                    id("word").value = "";
                    break;
                }
    
            if (flag2 == notFound) {
                incorrectNum += found;
                id("incorr-guess").textContent = incorrectNum;
                if (incorrectNum == LOSING_VAL) {
                    displayLose();
                    resetHelper();
                }
            } else if (flag2 == found) {
                displayWin();
                resetHelper();
            }
        }
    }
    
    function resetHelper() {
        incorrectNum = STARTING_VAL;
        correctLetters = new Array();
        incorrectLetters = new Array();
        id("word").value = "";
        id("letter").value = "";
        id("incorr-letters").textContent = "";
        id("corr-letters").textContent = "";
        id("incorr-guess").textContent = incorrectNum;
        id("answer").textContent = corrWord;
        id("num-letters").textContent = "__ letters";
    }
    
    function newWord() {
        fetchData();
        resetHelper();
        id("hangman").src = "imgs/happy.gif";
        id("num-letters").textContent = "__ letters";
        id("answer").textContent = "";
    }
    
    function displayWin() {
        id("hangman").src = "imgs/winner.gif";
    }

    function displayLose() {
        id("hangman").src = "imgs/lose.gif";
    }

    init();
})();
