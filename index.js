


//create the gameboard
const gameBoard = (function(){
  const board = [
                  ['','',''],
                  ['','',''],
                  ['','','']
                ]

  const updateBoard = (row,column,marker) => {
    if (board[row][column] === '') {
      board[row][column] = marker;
      return true; // Indicate successful update
    } else {
      return false; // Cell already occupied
    }

  }

  const getBoard = () => board

  

  return {updateBoard,getBoard}
})()



//player object ot create players
function player(playerName,playerMarker){
  const name = playerName
  const marker = playerMarker
  const getMarker = () => marker
  const getName = () => name
  let turn = 0
  const updateTurn = () => turn++
  const getTurn = () => turn
  return {getName,getMarker,getTurn,updateTurn}
}



function createPlayers(name1,name2){
    const player1 = player(name1,'X')// create id for accessing differnet situation
    const player2 = player(name2,'O')
    return {player1,player2}

}

function getPlayerName() {
  const name1 = document.getElementById('player1').value.trim();
  const name2 = document.getElementById('player2').value.trim();
  
  // Check if both names are empty
  if (!name1 && !name2) {
      return { name1: undefined, name2: undefined };
  }
  
  // Return names, using undefined for any empty name
  return {
      name1: name1 || undefined,
      name2: name2 || undefined
  };
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
  




const displayController = (function() {

    const containerEle = document.getElementById('container')
    let gamebox = document.createElement('div')
   
    
    gamebox.setAttribute('id','box')
    gamebox.classList.add('gamebox')

    const createCells = () => {
      const allCells = []
      const board = gameBoard.getBoard().flat()
      for(let i = 0; i < 9; i++){
        const cell = document.createElement('div')
        cell.id = `cell${i}`
        cell.classList.add('cell')
        cell.textContent = board[i]
        allCells.push(cell)
      }
        return allCells
    }

    const displayBoard = () => {
      gamebox.innerHTML = ''
      createCells().forEach(cell => 
        gamebox.appendChild(cell)
      )
      containerEle.appendChild(gamebox)
    }

    

    return {displayBoard}
  
})()


function gameFlow(){
  const restartBtn = document.getElementById("restart-btn");
  restartBtn.addEventListener("click", () => {
    window.location.reload();
  });



      
      const startBtn = document.getElementById('start-btn')
      startBtn.addEventListener('click',() => {
          startBtn.disabled = true
          const { name1, name2 } = getPlayerName();
          const { player1, player2 } = createPlayers(name1 || 'player-X', name2 || 'player-O');
          currentPlayer = player1
          displayController.displayBoard()
          const displayElement = document.getElementById('display-result')
          displayElement.textContent = `${currentPlayer.getName()}'s turn`

          const container = document.getElementById('container')
          container.addEventListener('click', handleCellClick)
            
            function handleCellClick(e){
            if (e.target.classList.contains('cell')) {
              const id = parseInt(e.target.id.replace('cell', ''), 10);
              const row = Math.floor(id / 3);
              const col = id % 3;
              const gameResult = playRounds(row,col,currentPlayer,displayElement)
              currentPlayer = currentPlayer === player1 ? player2: player1
              if(!gameResult)
              displayElement.textContent = `${currentPlayer.getName()}'s turn`
              else {
                displayElement.textContent = gameResult
                container.removeEventListener('click', handleCellClick)
              }
            
            }
        

      }
    
      

})

}

function playRounds(row,col,player) {
   
  const moveStatus = gameBoard.updateBoard(row,col,player.getMarker())
  if(moveStatus){
    player.updateTurn()
    displayController.displayBoard()
    
    const gameStatus = checkwinCondition(player.getMarker())
    
    if(gameStatus){
      return `${player.getName()} won`
    }
    if(player.getTurn() >= 5){
      return  `ITs a Draw, play again`

    }

}


    return null
  


}





gameFlow()



  
