let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");



let player1Input = document.getElementById("player1");
let player2Input = document.getElementById("player2");
let symbol1Select = document.getElementById("symbol1");
let startGameBtn = document.getElementById("start-game");
let turnIndicator = document.getElementById("turn-indicator");

let player1 = "";
let player2 = "";
let turnO = true; // true if it's Player 1's turn
let symbol1 = "X";
let symbol2 = "O";
let gameStarted = false;

// let turnO = true;//playerX , playerO

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

// const resetGame =() =>{
//     turnO = true;
//     enableBoxes();
//     msg.innerText =""
//     msgContainer.classList.add("hide");
// }

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msg.innerText = "";
    msgContainer.classList.add("hide");
    gameStarted = false;
    turnIndicator.innerText = "";
    player1Input.value = "";
    player2Input.value ="";
    symbol1Select.value = "X"
     symbol1 = "X";
     symbol2 = "O";
}


startGameBtn.addEventListener("click", () => {
    player1 = player1Input.value.trim();
    player2 = player2Input.value.trim();
    symbol1 = symbol1Select.value;
    symbol2 = symbol1 === "X" ? "O" : "X";

    // if (!player1 ||!player2) {
    //     alert("Please enter both player names.");
    //     return;
    // }

    if(!player1){
        player1Input.value ="Player 1";
        player1 = player1Input.value.trim();

    }
    if(!player2){
        player2Input.value ="Player 2";
        player2 = player2Input.value.trim();
    }

    gameStarted = true;
    turnO = true;
    enableBoxes();
    turnIndicator.innerText = `${player1}'s turn (${symbol1})`;
});


// boxes.forEach((box) => {
// box.addEventListener("click", ()=>{
//     console.log("box was clicked");
//     if(turnO){
//         box.innerText ="O";
//         box.style.color = "rgb(77, 151, 7)"
//         turnO = false;
//     }else{
//         box.innerText ="X";
//         box.style.color = "rgb(162, 3, 3)";
//         turnO= true;
// }
// box.disabled = true;

// checkWinner();
// checkTie();
// });
// });

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (!gameStarted || box.innerText !== ""){ 
            return;}

        if (turnO) {
            box.innerText = symbol1;
            box.style.color = symbol1 === "O" ? "rgb(77, 151, 7)" : "rgb(162, 3, 3)";
            turnO = false;
            turnIndicator.innerText = `${player2}'s turn (${symbol2})`;
        } else {
            box.innerText = symbol2;
            box.style.color = symbol2 === "O" ? "rgb(77, 151, 7)" : "rgb(162, 3, 3)";
            turnO = true;
            turnIndicator.innerText = `${player1}'s turn (${symbol1})`;
        }

        box.disabled = true;
        checkWinner();
        checkTie();
    });
});



const disableBoxes =()=>
{
    for( let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes =()=>
{
    for( let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

function showWinner(symbol) {
    const winner = symbol === symbol1 ? player1 : player2;
    msg.innerText = `🎉Congratulations! ${winner} wins! (${symbol})`;
    msgContainer.classList.remove("hide");
    turnIndicator.innerText = "";
}

// function showWinner(arg){
//     msg.innerText = "Congratulations!, Winner is "+arg;
//     msgContainer.classList.remove("hide");
// }


const showTie =()=>{
     msg.innerText = "It's a tie!";
    msgContainer.classList.remove("hide");
}

function checkTie(){
    let tie = true;
    for( let box of boxes){
        if ( box.innerText == ""){
            tie = false;
        break;}
    }
    if (tie && msg.innerText ==""){
        showTie();
    }
}


function checkWinner(){
    for(let pattern of winPatterns){
        //console.log(pattern[0],pattern[1],pattern[2]);
        //console.log(boxes[pattern[0]].innerText,boxes[pattern[1]].innerText,boxes[pattern[2]].innerText);
        let val1 = boxes[pattern[0]].innerText
        let val2 = boxes[pattern[1]].innerText
        let val3 = boxes[pattern[2]].innerText

        if(val1 != "" && val2 != "" && val3 != ""){
            if(val1==val2 && val2==val3){
                console.log("winner", val1);
                disableBoxes();
                showWinner(val1);
            }
        }
    }
};

newGameBtn.addEventListener("click", resetGame)
resetBtn.addEventListener("click", resetGame)

