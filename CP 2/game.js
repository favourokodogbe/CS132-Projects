(function() {
    "use strict";

    function init() {
        id("start-btn").addEventListener("click", gamePage);
        id("back-btn").addEventListener("click", mainPage);
        id("check-btn").addEventListener("click", isCorrect);
        myPix = new Array("imgs/dog.jpeg", "imgs/cat.jpeg", "imgs/hor.webp",
        "imgs/slo.jpeg", "imgs/koa.jpeg", "imgs/pen.jpeg", "imgs/axo.jpeg", 
        "imgs/por.jpeg", "imgs/leo.jpeg", "imgs/gib.jpeg");
    }

    const STARTING_CORRECT = 0;
    const TIME_FINISHED = 0;
    const NUM_REMOVED = 1;
    const TOTAL_CORRECT = 10;
    const KEY_IND = 0;
    const VAL_IND = 1;
    const LENGTH_OF_SRC = 13;
    const STARTING_TIME = 30;
    const MAX_TIMING = 1000;
    
    let myPix;
    let numCorrect = 0;
    let timeLeft;
    let guess = id('guess');
    let correctVal = "correct";
    let incorrectVal = "incorrect";
    let emptyVal = "";
    let elem = id('time');
    let count = id('corr-count');
    let timerId = null;
 
    /* This function starts the game when the 
    play button is clicked */
    function gamePage() {
        toggleView();
        timeLeft = STARTING_TIME;
        timerId = setInterval(timer, MAX_TIMING);
        timer();
        numCorrect = STARTING_CORRECT;
        count.textContent = STARTING_CORRECT;
        guess.textContent = emptyVal;
        randomPic();
    }

    /* This function resets the array of animals pics
    and shows the main page when the back to main
    button is clicked */
    function mainPage() {
        toggleView();
        myPix = new Array("imgs/dog.jpeg", "imgs/cat.jpeg", "imgs/hor.webp",
            "imgs/slo.jpeg", "imgs/koa.jpeg", "imgs/pen.jpeg", "imgs/axo.jpeg", 
            "imgs/por.jpeg", "imgs/leo.jpeg", "imgs/gib.jpeg");
        elem.textContent = TIME_FINISHED + ' seconds left'
        clearInterval(timerId);
    }
    
    /** This function starts the timer and updates it on the game screen*/
    function timer() {
        if (timeLeft < TIME_FINISHED) {
            guess.textContent = emptyVal;
            displayLose();
            clearInterval(timerId);
        } else {
            elem.textContent = timeLeft + ' seconds left';
            timeLeft--;
        }
    }
    
    /**This function checks that the answer selected is correct for the picture 
     * provided.
     */
    function isCorrect() {
        let animalDict = {
            // Source: https://www.goodhousekeeping.com/life/pets/g4531/cutest-dog-breeds/
            "imgs/dog.jpeg": "Dog", 
            // Source: https://unsplash.com/images/animals/cat
            "imgs/cat.jpeg": "Cat", 
            // Source: https://horseyhooves.com/how-far-long-can-a-horse-run/
            "imgs/hor.webp": "Horse", 
            // Source: https://stock.adobe.com/search?k=sloth
            "imgs/slo.jpeg": "Sloth",
            // Source: https://en.wikipedia.org/wiki/Koala
            "imgs/koa.jpeg": "Koala", 
            // Source: https://ebird.org/species/emppen1
            "imgs/pen.jpeg": "Penguin", 
            // Source: https://stock.adobe.com/search?k=axolotl
            "imgs/axo.jpeg": "Axolotl", 
            // Source: https://www.istockphoto.com/photo/curious-porpoise-gm180820223-24700666
            "imgs/por.jpeg": "Porpoise",
            // Source: https://en.wikipedia.org/wiki/African_leopard
            "imgs/leo.jpeg": "Leopard", 
            // Source: https://www.istockphoto.com/photo/white-handed-gibbon-eye-contact-gm482658895-37248302
            "imgs/gib.jpeg": "Gibbon"};
            
        let compareAns = "";
        let selectElement = id("animal-options").value;
        let word = id("animal-pic").src; 
        for (let i = word.length - LENGTH_OF_SRC; i < word.length; i++) {
            compareAns += word[i];
        }
        for (const key of Object.entries(animalDict)) {
            if (key[KEY_IND] == compareAns) {
                if (key[VAL_IND] == selectElement) {
                    guess.textContent = correctVal;
                    numCorrect++;
                    count.textContent = numCorrect;
                    if (numCorrect == TOTAL_CORRECT && timeLeft > TIME_FINISHED) {
                        clearInterval(timerId);
                        elem.textContent = TIME_FINISHED + ' seconds left';
                        guess.textContent = emptyVal;
                        displayWin();
                    } else if (numCorrect < TOTAL_CORRECT) {
                        randomPic();
                    }
                } else {
                    guess.textContent = incorrectVal;
                }
            }
        }
    }

    /**This function displays the winner screen on the 
     * original animal picture box. This only shows
     * when the user wins the game.
     */
    function displayWin() {
        id("animal-pic").src = "imgs/you-win.gif";
    }

    /**This function displays the loser screen on the 
     * original animal picture box. This only shows
     * when the user losess the game.
     */
    function displayLose() {
        id("animal-pic").src = "imgs/you_lose.gif";
    }

    /**This function generates a random picture from the array
     * of pictures and removes the picture after it has already
     * been used.
     */
    function randomPic() {
        let randomNum = Math.floor(Math.random() * myPix.length);
        id("animal-pic").src = myPix[randomNum];
        let removed = myPix.splice(randomNum, NUM_REMOVED);
    }

    /**This function switches between screens of the main page 
     * and game page.
     */
    function toggleView() {
        id("game-page").classList.toggle("hidden");
        id("home-page").classList.toggle("hidden");
    }

    init();
})();
