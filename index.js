


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

  

  return {showBoard,updateBoard}
})()



//player object ot create players
function player(playerName,playerMarker,playerId){
  const name = playerName
  const marker = playerMarker
  const id = playerId // for identifying player for certain situations eg: to prevent insertion into the same cell
  let score = 0
  const updateScore = () => score++
  const getScore = () => score
  const getMarker = () => marker
  const getName = () => name
  let turn = 0
  const updateTurn = () => turn++
  const getTurn = () => turn
  const resetTurn = () => turn = 0
  const getId = () => id
  return {getName,getScore,updateScore,getMarker,updateTurn,getTurn,resetTurn,getId}
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


function playRound(...players){
  


    players.forEach(player => {

      let isMoveValid = false;
      do {
      player.updateTurn()
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
        player.resetTurn()
      }
      } while (!isMoveValid) // Repeat if the cell is taken

      gameBoard.showBoard()

    
    })
    

    

}

          

  



//gameFlow controls the game
function gameFlow(){
  const {name1,name2,marker1,marker2} = getPlayerInput()
  const {player1,player2} = createPlayers(name1,name2,marker1,marker2)
  playRound(player1,player2)
  
}




gameFlow()

