export var createArray = (initialValue, length = 0, ...args) => {
    let arr = length ? new Array(length) : ""
    let i = length
    if (args.length) {
        while(i--){
            arr[length - 1 - i] = createArray(initialValue, ...args)

        } 
    }else{
        arr.fill(initialValue)
    }
    return arr;
  }
export const Player = {
    BLACK:"black",
    WHITE:"white",
    EMPTY:""
}

export const hasAdjacentOpponent = (board, player, [x, y]) => {
    if(board[x][y] !== "")
        return false
    for(let j = -1; j <= 1; j++){
        for(let i = -1; i <= 1; i++){
            if(x + j >= 0 && y + i >= 0 && x + j < board.length && y + i < board[0].length)
                if(board[x + j][y + i] !== player 
                    && board[x + j][y + i] !== "")
                    return true
        }
    }        
    return false
}
export const willFlankOpponent = (board, player, [x, y]) => {
    const isPlayer = ([xed, zed]) => board[xed][zed] === player
    const isEmpty = ([xed, zed]) => board[xed][zed] === ""
    const isNotInBounds = ([xed, zed]) => !!board[xed] && !!board[xed][zed]
   
    const checkLineCreator =  ([xed, zed]) =>( [incrementX, incrementY] )=> {
        let currentX = xed === x ? xed + incrementX : xed
        let currentY = zed === y ? zed + incrementY : zed
        if(!isNotInBounds([currentX, currentY]))
            return false
        
        if((isPlayer([currentX, currentY]) 
            || isEmpty([currentX, currentY])) 
            && (currentX === x + incrementX && currentY === y + incrementY))
            return false
        
        if(isPlayer([currentX, currentY]))
            return true
        const returnValue = checkLineCreator([currentX + incrementX, currentY + incrementY])([incrementX, incrementY])
        
        if(returnValue === true)
            return [[currentX, currentY]]
        
        if(returnValue)
            return [...returnValue, [currentX, currentY]]
        return false
    }
    const checkLine = checkLineCreator([x, y])
    const lineIncrements = [
    /*checkDownLeftLine*/  ([1, -1]),
    /*checkDownRightLine*/  ([1, 1]),
    /*checkUpLeftLine*/  ([-1, -1]),
    /*checkUpRightLine*/  ([-1, 1]),
    /*checkLeftLine*/  ([0, -1]),
    /*checkRightLine*/  ([0, 1]),
    /*checkUpLine*/  ([-1, 0]),
    /*checkDownLine*/  ([1, 0])
    ]
    const result = lineIncrements.reduce((spaces, increment)=>{
        const checkLineReturn = checkLine(increment)
        if(checkLineReturn){
            return spaces.concat(checkLineReturn) 
        }
        return spaces
    }, [])
    return result.length === 0 ? false : result
}
export const countPieces = (board)=>{
    return board.reduce( (allSum, row) => {
        const rowValue = row.reduce((sum, piece) => {
          if(piece === Player.BLACK){
            return { ...sum, black: sum.black + 1 }
          }
          else if(piece === Player.WHITE)
          return { ...sum, white: sum.white + 1}
          else return sum
        }, {black:0, white:0})
        return { black: allSum.black + rowValue.black, white: allSum.white + rowValue.white}
      }, {black:0, white:0})
}
export const findPlayableSpots = (board, currentPlayer) => {
    const playableSpots = board.reduce( (allPositions, row, i) => {
        const rowValues = row.reduce((positions, piece, j) => {
          if(hasAdjacentOpponent(board, currentPlayer, [i,j]) && willFlankOpponent(board, currentPlayer, [i, j])){
            return [...positions, [i, j]]
          }
          return positions
        }, [])
        return [...allPositions, ...rowValues]
      }, [])
      return playableSpots
  }

export const isGameOver = (board, currentPlayer) => {
    const otherPlayer = Player.WHITE === currentPlayer ? Player.BLACK : Player.WHITE
    const { white, black } = countPieces(board)
    const totalPieces = white + black
    const maxPieces = Math.pow(board.length, 2)
    if(totalPieces === maxPieces){
      return true
    }
    const numberOfPlayableSpots = findPlayableSpots(board, currentPlayer).length
    const numberOfOtherPlayableSpots = findPlayableSpots(board, otherPlayer).length
    if(numberOfPlayableSpots === 0 && numberOfOtherPlayableSpots === 0){
      return true
    }
    return false
  }
  export const getNextPlayer =  (currentPlayer) => Player.BLACK === currentPlayer ? Player.WHITE : Player.BLACK