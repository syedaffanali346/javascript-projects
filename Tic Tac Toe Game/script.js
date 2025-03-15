let boxes = document.querySelectorAll(".box");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let newGameBtn = document.querySelector("#newGameBtn");
let resetBtn = document.querySelector("#reset-btn");
let reset_Btn = document.querySelector(".res_btn");

let winnigPattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let turnO = true;
let clickCount = 0;
let isWinner = false;
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if (turnO) {
            box.innerText= "O";
            turnO = false;
        }
        else{
            box.innerText = "X";
            turnO = true;
        }
        clickCount++;
        box.disabled = true;
        let isWinner = checkWinner();
        if (clickCount === 9 && !isWinner) {
                drawGame();
        }
    })
});

const checkWinner = ()=>{
    for (const pattern of winnigPattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if (pos1Val != "" && pos2Val !="" && pos3Val != "") {
            if (pos1Val == pos2Val && pos2Val == pos3Val) {
                disableBtns();
                msg.innerText = `Congratulations! Winner is ${pos1Val}`;
                msgContainer.classList.remove("hide");
            }
        }
    }
};

const disableBtns = ()=>{
    for(let box of boxes) {
      box.disabled = true;
      resetBtn.disabled = true;
      resetBtn.style.opacity = "0.3";
    }
}
const newGame = () =>{
    msgContainer.classList.add("hide");
    for (const box of boxes) {
        box.disabled = false;
        box.innerText = "";
        resetBtn.disabled = false;
        resetBtn.style.opacity = "1";
        clickCount = 0;
    }
}
const resetGame = () =>{
    for (const box of boxes) {
        box.innerText = "";
        box.disabled = false;
        clickCount = 0;
    }
};

const drawGame = ()=>{
    msgContainer.classList.remove("hide");
    msg.innerText = "Game was draw, Try again!";
    disableBtns();
    clickCount = 0;
};

newGameBtn.addEventListener("click",()=>{
    newGame();
})
resetBtn.addEventListener("click",()=>{
    resetGame();
})
