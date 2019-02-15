//list of all icons
const cards = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"];

// create a parent (box) for the cards
var cardBox = document.querySelector(".deck");
var modal = document.getElementById('myModal');
var closeIt = document.getElementsByClassName("close")[0];
var btn = document.getElementById('playAgain');

let openedCards = [];
let pair = [];
let moves = 0;

//shuffle before clicked
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


//loop through each card and create its HTML and put them inside .deck
function initiGame() {

    card = shuffle(cards);

    timer.innerHTML = "0 mins 0 secs";

    for(let i = 0; i < cards.length; i++) {
        const card = document.createElement("li");
        card.classList.add("card");
        card.innerHTML = `<i class="${cards[i]}"></i>`;
        cardBox.appendChild(card);

        //add function click to every card
        click(card);

    }
}

//set timer
var second = 0, minute = 0;
var timer = document.querySelector(".timer");
var interval;

function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute + "mins " + second + "secs";
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}

//click event
function click(card) {
      card.addEventListener("click", function() {

      const currentCard = this;
      const previousCard = openedCards[0];

//when run the event, if there's one card opened (only 1 card equal to true),
//this will be true so the card will be open and add to the opened cards
      if (openedCards.length === 1) {

          card.classList.add("open", "show", "disabled");
          openedCards.push(this);

          //compare the current card, and the previous card
          match(currentCard, previousCard);


      //no opened card or opened 2, will be false and the opened one will added to "opened" and continue
      } else {
          currentCard.classList.add("open", "show", "disabled");
          openedCards.push(this);
      }

    })
}

///try to match the 2 cards
function match(currentCard, previousCard){
    if(currentCard.innerHTML === previousCard.innerHTML) {
        currentCard.classList.add("match");
        previousCard.classList.add("match");

        //add to the matched array
        pair.push(currentCard, previousCard);

        //continue
        openedCards = [];

        //finished?
        finished();

    //remove both cards after 5 sec if not match
    } else {

        //reset
        openedCards = [];

        setTimeout(function() {
          currentCard.classList.remove("open", "show", "disabled");
          previousCard.classList.remove("open", "show", "disabled");
        }, 500);

    }

    //add moves after second click
    moveCounter();
}


//to check if the matched pairs = total cards number
// modal
function finished() {
    if (pair.length == 16) {
        //stop the time and use the time for popup
        clearInterval(interval);
        let timeUsed = timer.innerHTML;

        // popup modal
        modal.classList.add("show");

        //showing move, rating, time on modal
        var rating = document.querySelector(".stars").innerHTML;
        document.getElementById("moves").innerHTML = moves;
        document.getElementById("rating").innerHTML = rating;
        document.getElementById("timeUsed").innerHTML = timeUsed;

        closeModal();
    }
}

// close the modal
function closeModal(){
    closeIt.addEventListener("click", function(e){
    modal.classList.remove("show");
    });
}

//play again btn
btn.addEventListener('click', playAgain);

function playAgain(){
    modal.classList.remove("show");

    cardBox.innerHTML = "";
    pair = [];
    moves = 0;
    counter.innerHTML = moves;
    starRating.innerHTML = "<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i><li><i class='fa fa-star'></i></li>";
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);

    initiGame();
}

//clicks anywhere outside of the modal, close it
window.onclick = function(e) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


//moves count
const counter = document.querySelector(".moves");
counter.innerHTML = 0;
function moveCounter() {
    moves++;
    counter.innerHTML = moves;

    //timer starts
    if(moves == 1){
        second = 0;
        minute = 0;
        hour = 0;
        startTimer();
    }

    //count the moves for stars rating
    stars();
}

//rating
const starRating = document.querySelector(".stars");
function stars() {
  	if (moves > 15) {
  		starRating.innerHTML = "<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li>";
  	}
  	if (moves > 19) {
  		starRating.innerHTML = "<li><i class='fa fa-star'></i></li>";
  	}
  	if (moves > 23) {
  		starRating.innerHTML = "<li><i class='fa fa-star-half'></i></li>";
  	}

  	if(moves > 27) {
  		starRating.innerHTML = "<li><i>...</i></li>";
  	}
}




// restart
const restartBtn = document.querySelector(".restart");
restartBtn.addEventListener("click", function () {

    //clear the cards
    cardBox.innerHTML = "";

    //reset the pairs from previous game
    pair = [];

    //reset the moves/stars
    moves = 0;
    counter.innerHTML = moves;
    starRating.innerHTML = "<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i><li><i class='fa fa-star'></i></li>";

    //reset timer
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);


    //start game
    initiGame();
});

//start the game
initiGame();










/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
