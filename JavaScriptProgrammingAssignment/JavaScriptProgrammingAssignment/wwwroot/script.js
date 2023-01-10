const turn = document.getElementById("player-turn");
const p1score = document.getElementById("player-one-score");
const p2score = document.getElementById("player-two-score");
const p3score = document.getElementById("player-three-score");
const p4score = document.getElementById("player-four-score");
const boardSize = document.getElementById("size");
const type = document.getElementById("type");
const playerNumber = document.getElementById("player-number");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
var cards;
var interval;
var firstCard = false;
var secondCard = false;

const dogs = [
    { name: "dog1", image: "images/dog1.png" },
    { name: "dog2", image: "images/dog2.png" },
    { name: "dog3", image: "images/dog3.png" },
    { name: "dog4", image: "images/dog4.png" },
    { name: "dog5", image: "images/dog5.png" },
    { name: "dog6", image: "images/dog6.png" },
    { name: "dog7", image: "images/dog7.png" },
    { name: "dog8", image: "images/dog8.png" },
    { name: "dog9", image: "images/dog9.png" },
    { name: "dog10", image: "images/dog10.png" },
];

const cats = [
    { name: "cat1", image: "images/cat1.png" },
    { name: "cat2", image: "images/cat2.png" },
    { name: "cat3", image: "images/cat3.png" },
    { name: "cat4", image: "images/cat4.png" },
    { name: "cat5", image: "images/cat5.png" },
    { name: "cat6", image: "images/cat6.png" },
    { name: "cat7", image: "images/cat7.png" },
    { name: "cat8", image: "images/cat8.png" },
    { name: "cat9", image: "images/cat9.png" },
    { name: "cat10", image: "images/cat10.png" },
];

const dinasours = [
    { name: "dinasour1", image: "images/dinasour1.png" },
    { name: "dinasour2", image: "images/dinasour2.png" },
    { name: "dinasour3", image: "images/dinasour3.png" },
    { name: "dinasour4", image: "images/dinasour4.png" },
    { name: "dinasour5", image: "images/dinasour5.png" },
    { name: "dinasour6", image: "images/dinasour6.png" },
    { name: "dinasour7", image: "images/dinasour7.png" },
    { name: "dinasour8", image: "images/dinasour8.png" },
    { name: "dinasour9", image: "images/dinasour9.png" },
    { name: "dinasour10", image: "images/dinasour10.png" },
];

var items = [];
var gameType = type.options[type.selectedIndex].value;
var gameSize = boardSize.options[boardSize.selectedIndex].value;
var maxPlayer = playerNumber.options[playerNumber.selectedIndex].value;

var playerOneScore = 0;
var playerTwoScore = 0;
var playerThreeScore = 0;
var playerFourScore = 0;
var playerTurn = 1;

var seconds = 0,
    minutes = 0;
var winCount = 0;

const timer = () => {
    seconds += 1;
    if (seconds >= 60) {
        minutes += 1;
        seconds = 0;
    }
    var secondsValue = seconds < 10 ? `0${seconds}` : seconds;
    var minutesValue = minutes < 10 ? `0${minutes}` : minutes;
    timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

const generateRandom = (size = gameSize) => {
    var tempArray = [...items];
    var cardValues = [];
    size = size / 2;
    for (var i = 0; i < size; i++) {
        const randomIndex = Math.floor(Math.random() * tempArray.length);
        cardValues.push(tempArray[randomIndex]);
        tempArray.splice(randomIndex, 1);
    }
    return cardValues;
};

const createBoard = (cardValues, size = gameSize) => {
    gameContainer.innerHTML = "";
    cardValues = [...cardValues, ...cardValues];
    cardValues.sort(() => Math.random() - 0.5);
    for (var i = 0; i < size; i++) {
        gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/></div>
     </div>
     `;
    }
    gameContainer.style.gridTemplateColumns = `repeat(4,auto)`;

    cards = document.querySelectorAll(".card-container");
    cards.forEach((card) => {
        card.addEventListener("click", () => {
            if (!card.classList.contains("matched")) {
                card.classList.add("flipped");
                if (!firstCard) {
                    firstCard = card;
                    firstCardValue = card.getAttribute("data-card-value");
                } else {
                    secondCard = card;
                    var secondCardValue = card.getAttribute("data-card-value");
                    if (firstCardValue == secondCardValue) {
                        firstCard.classList.add("matched");
                        secondCard.classList.add("matched");
                        firstCard = false;
                        winCount += 1;
                        if (playerTurn == 1) {
                            playerOneScore += 1;
                        }
                        else if (playerTurn == 2) {
                            playerTwoScore += 1;
                        }
                        else if (playerTurn == 3) {
                            playerThreeScore += 1;
                        }
                        else if (playerTurn == 4) {
                            playerFourScore += 1;
                        }
                        if (winCount == Math.floor(cardValues.length / 2)) {
                            if (playerOneScore > playerTwoScore && playerOneScore > playerThreeScore && playerOneScore > playerFourScore) {
                                result.innerHTML = `<h2>Gama Over</h2>
                            <h4>Player 1 Won</h4>
                            <h2>Player 1 Score: ${playerOneScore}<h2>
                            <h2>Player 2 Score: ${playerTwoScore}<h2>
                            <h2>Player 3 Score: ${playerThreeScore}<h2>
                            <h2>Player 4 Score: ${playerFourScore}<h2>`;
                            }
                            else if (playerTwoScore > playerOneScore && playerTwoScore > playerThreeScore && playerTwoScore > playerFourScore) {
                                result.innerHTML = `<h2>Gama Over</h2>
                            <h4>Player 2 Won</h4>
                            <h2>Player 1 Score: ${playerOneScore}<h2>
                            <h2>Player 2 Score: ${playerTwoScore}<h2>
                            <h2>Player 3 Score: ${playerThreeScore}<h2>
                            <h2>Player 4 Score: ${playerFourScore}<h2>`;
                            }
                            else if (playerThreeScore > playerOneScore && playerThreeScore > playerTwoScore && playerThreeScore > playerFourScore) {
                                result.innerHTML = `<h2>Gama Over</h2>
                            <h4>Player 3 Won</h4>
                            <h2>Player 1 Score: ${playerOneScore}<h2>
                            <h2>Player 2 Score: ${playerTwoScore}<h2>
                            <h2>Player 3 Score: ${playerThreeScore}<h2>
                            <h2>Player 4 Score: ${playerFourScore}<h2>`;
                            }
                            else if (playerFourScore > playerOneScore && playerFourScore > playerThreeScore && playerFourScore > playerTwoScore) {
                                result.innerHTML = `<h2>Gama Over</h2>
                            <h4>Player 4 Won</h4>
                            <h2>Player 1 Score: ${playerOneScore}<h2>
                            <h2>Player 2 Score: ${playerTwoScore}<h2>
                            <h2>Player 3 Score: ${playerThreeScore}<h2>
                            <h2>Player 4 Score: ${playerFourScore}<h2>`;
                            }
                            else {
                                result.innerHTML = `<h2>Gama Over</h2>
                            <h4>It's a draw</h4>
                            <h2>Player 1 Score: ${playerOneScore}<h2>
                            <h2>Player 2 Score: ${playerTwoScore}<h2>
                            <h2>Player 3 Score: ${playerThreeScore}<h2>
                            <h2>Player 4 Score: ${playerFourScore}<h2>`;
                            }
                            stopGame();
                        }
                    } else {
                        var [tempFirst, tempSecond] = [firstCard, secondCard];
                        firstCard = false;
                        secondCard = false;
                        var delay = setTimeout(() => {
                            tempFirst.classList.remove("flipped");
                            tempSecond.classList.remove("flipped");
                        }, 900);
                    }
                    if (playerTurn == maxPlayer) {
                        playerTurn = 1;
                    }
                    else{
                        playerTurn += 1;
                    }
                    turn.innerHTML = `<span>Player </span>${playerTurn}s turn`;
                    p1score.innerHTML = `<span>Player 1 Score:</span>${playerOneScore}`;
                    p2score.innerHTML = `<span>Player 2 Score:</span>${playerTwoScore}`;
                    if (maxPlayer >= 3) {
                        p3score.innerHTML = `<span>Player 3 Score:</span>${playerThreeScore}`;
                    }
                    if (maxPlayer >= 4) {
                        p4score.innerHTML = `<span>Player 4 Score:</span>${playerFourScore}`;
                    }
                }
            }
        });
    });
};

startButton.addEventListener("click", () => {
    seconds = 0;
    minutes = 0;
    playerOneScore = 0;
    playerTwoScore = 0;
    playerTurn = 1;
    maxPlayer = playerNumber.options[playerNumber.selectedIndex].value;
    gameSize = boardSize.options[boardSize.selectedIndex].value;
    gameType = type.options[type.selectedIndex].value;
    if (gameType == 1) {
        items = dogs;
    }
    if (gameType == 2) {
        items = cats;
    }
    if (gameType == 3) {
        items = dinasours;
    }
    controls.classList.add("hide");
    stopButton.classList.remove("hide");
    startButton.classList.add("hide");
    interval = setInterval(timer, 1000);
    turn.innerHTML = `<span>Player </span>${playerTurn}s turn`;
    p1score.innerHTML = `<span>Player 1 Score:</span>${playerOneScore}`;
    p2score.innerHTML = `<span>Player 2 Score:</span>${playerTwoScore}`;
    if (maxPlayer >= 3) {
        p3score.innerHTML = `<span>Player 3 Score:</span>${playerThreeScore}`;
    }
    if (maxPlayer >= 4) {
        p4score.innerHTML = `<span>Player 4 Score:</span>${playerFourScore}`;
    }
    initializer();
});

stopButton.addEventListener(
    "click",
    (stopGame = () => {
        controls.classList.remove("hide");
        stopButton.classList.add("hide");
        startButton.classList.remove("hide");
        clearInterval(interval);
    })
);

const initializer = () => {
    result.innerText = "";
    winCount = 0;
    var cardValues = generateRandom();
    console.log(cardValues);
    createBoard(cardValues);
};