let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));
let winnerIndeicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);

const startGame = () => {
   boxes.forEach(box => box.addEventListener('click',boxClicked))
}

function boxClicked(e){
   const id = e.target.id;

   if(!spaces[id]){
      spaces[id] = currentPlayer;
      e.target.innerText = currentPlayer;

      if (playerHasWon() !== false ){
         let winning_blocks = playerHasWon();
         if (currentPlayer == X_TEXT){
            playerText.innerHTML = "X Player has won!";
         }else{
            playerText.innerHTML = "O Player has won!";
         }
         winning_blocks.map(box => boxes[box].style.backgroundColor=winnerIndeicator);
         return;
      }

      currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;

   }
}
//it's array have all possibilities to won
const winningCombos = [
   [0,1,2],
   [3,4,5],
   [6,7,8],
   [2,4,6],
   [0,4,8],
   [0,3,6],
   [1,4,7],
   [2,5,8]
]
//function to verify win
function playerHasWon() {
   for (const condition of winningCombos) {
      let [a, b, c] = condition ;

      if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
         return [a,b,c];

      }
   }
   return false;

}

restartBtn.addEventListener("click" , restart);

function restart(){
   spaces.fill(null);

   boxes.forEach(box => {
      box.innerText = '' ;
      box.style.backgroundColor = '';
   })
   playerText.innerHTML = "Tic Tie Toe";
   currentPlayer = X_TEXT;
}


startGame();