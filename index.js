


//create the gameboard
const gameBoard = (function(){
  const board = [
                  ['','',''],
                  ['','',''],
                  ['','','']
                ]

  const showBoard = () => {
    board.forEach(row => console.log(row))
  }

  const updateBoard = (row,column,marker) => {
      board[row][column] = marker
  }
  return {showBoard,updateBoard}
})()



//player object ot create players
function player(playerName,playerMarker){
  const name = playerName
  const marker = playerMarker
  let score = 0
  const updateScore = () => score++
  const getScore = () => score
  return {name,marker,getScore,updateScore}
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
    const player1 = player(name1,marker1)
    const player2 = player(name2,marker2)
    return {player1,player2}

}


function playRound(player1,player2){
  alert('Round 1')

  let row = ''
  while(row !== 1 && row !== 2 && row !== 3){
    row = parseInt(prompt('Enter row number')) 
    if(row !== 1 && row !== 2 && row !== 3){
      alert("Enter a number 1 - 2 - 3")
    }
  }
  
  let column = ''
  while(column !== 1 && column !== 2 && column !== 3){
    column = parseInt(prompt('Enter column number')) 
    if(column !== 1 && column !== 2 && column !== 3){
      alert("Enter a number 1 - 2 - 3")
    }
  }
  
  row--
  column--
  gameBoard.updateBoard(row,column)
  gameBoard.showBoard()
  
}


//gameFlow controls the game
function gameFlow(){
  const {name1,name2,marker1,marker2} = getPlayerInput()
  const {player1,player2} = createPlayers(name1,name2,marker1,marker2)
  playRound(player1,player2)
  
}




gameFlow()

