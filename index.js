


//create the gameboard
const gameBoard = (function(){
  const board = [
                  ['','',''],
                  ['','',''],
                  ['','','']
                ]

  const showBoard = () => {
    board.forEach(row => {
      console.log(row.join(' | ')) 
      console.log('---------')
    })
  } 
      


  const updateBoard = (row,column,marker) => {
    if (board[row][column] === '') {
      board[row][column] = marker;
      return true; // Indicate successful update
    } else {
      return false; // Cell already occupied
    }

  }

  const getBoard = () => board

  

  return {showBoard,updateBoard,getBoard}
})()



//player object ot create players
function player(playerName,playerMarker,playerId){
  const name = playerName
  const marker = playerMarker
  const id = playerId // for identifying player for certain situations eg: to check win conditions at certain turns
  let score = 0
  const updateScore = () => score++
  const getScore = () => score
  const getMarker = () => marker
  const getName = () => name
  let turn = 0
  const increaseTurnCount = () => turn++
  const getTurn = () => turn
  const decreaseTurnCount = () => turn--
  const getId = () => id
  return {getName,getScore,updateScore,getMarker,increaseTurnCount,getTurn,decreaseTurnCount,getId}
}



function getPlayerInput(){
  alert("Welcome to the Game, you have to enter your name and choose your marker")
  let name1 = ''
  let name2 = ''
  while(!name1.trim()){
    name1 = prompt("Enter player1's name:")
    if(!name1.trim()){
      alert("Enter a valid name")
    }
  } 

  while(!name2.trim()){
    name2 = prompt("Enter player2's name:")
    if(!name2.trim()){
      alert("Enter a valid name")
    }
  } 

  let marker1 = ''
  let marker2 = ''

  while(marker1 !== 'x' && marker1 !== 'o'){
    marker1 = prompt(`${name1}, choose your marker: 'x' or 'o'`).toLowerCase().trim()
    if(marker1 !== 'x' && marker1 !== 'o'){
      alert("Enter either x or o")
    }
  }

  marker2 = marker1 === 'x' ? 'o' : 'x'

    return {name1,name2,marker1,marker2}
   
}


function createPlayers(name1,name2,marker1,marker2){
    const player1 = player(name1,marker1,1)// create id for accessing differnet situation
    const player2 = player(name2,marker2,2)
    return {player1,player2}

}


function playSingleRound(player){
  


    

      let isMoveValid = false;
      do {
      player.increaseTurnCount()
      console.log(`Round ${player.getTurn()}: ${player.getName()}'s turn`)
      let row = ''
      let column = ''

      while(row !== 1 && row !== 2 && row !== 3){
        row = parseInt(prompt(`${player.getName()}, Enter row number: 1 2 3`)) 
        if(row !== 1 && row !== 2 && row !== 3){
          alert(`${player.getName()}, Enter a number 1 - 2 - 3`)
        }
       
      }
      
      
      while(column !== 1 && column !== 2 && column !== 3){
        column = parseInt(prompt(`${player.getName()}, Enter column number 1 2 3`)) 
        if(column !== 1 && column !== 2 && column !== 3){
          alert(`${player.getName()}, Enter a number 1 - 2 - 3`)
        }
        
      }
      
      row--
      column--

      isMoveValid = gameBoard.updateBoard(row, column, player.getMarker());
      if (!isMoveValid) {
        alert("That cell is already taken! Please choose another one.");
        player.decreaseTurnCount()
      }
      } while (!isMoveValid) // Repeat if the cell is taken

      gameBoard.showBoard()

    
  
    

    

}

function checkwinCondition(marker){
  if(q){

  }
}
  

function playAllRounds(player1, player2) {
  for (let i = 0; i < 4; i++) {
    // Player 1's turn
    playSingleRound(player1);
    if (player1.getTurn() >= 3) {
      if (checkwinCondition(player1.getMarker())) {
        console.log(`${player1.getName()} wins!`);
        return; // Exit the function if player 1 wins
      }
    }

    // Player 2's turn
    playSingleRound(player2);
    if (player2.getTurn() >= 3) {
      if (checkwinCondition(player2.getMarker())) {
        console.log(`${player2.getName()} wins!`);
        return; // Exit the function if player 2 wins
      }
    }
  }

  // After 4 rounds, check if the game is a draw
  console.log("The game is a draw!");
}


function checkwinCondition(marker){
  const board = gameBoard.getBoard()
  
  
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (board[i][0] === marker && board[i][1] === marker && board[i][2] === marker) {
        return true;
      }
    }
  
    // Check columns
    for (let i = 0; i < 3; i++) {
      if (board[0][i] === marker && board[1][i] === marker && board[2][i] === marker) {
        return true;
      }
    }
  
    // Check diagonals
    if (
      (board[0][0] === marker && board[1][1] === marker && board[2][2] === marker) || 
      (board[0][2] === marker && board[1][1] === marker && board[2][0] === marker)
    ) {
      return true;
    }
  
    // No win condition met
    return false;
  }
  

          




//gameFlow controls the game
function gameFlow(){
  const {name1,name2,marker1,marker2} = getPlayerInput()
  const {player1,player2} = createPlayers(name1,name2,marker1,marker2)
  playAllRounds(player1,player2)
  
}




gameFlow()

