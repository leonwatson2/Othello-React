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
    BLUE:"BLUE",
    EMPTY:""
}
// const createPiece = ({player = Player.EMPTY, isEmpty = true, color = "green"} = {})=>({
//     player,
//     isEmpty: player === Player.EMPTY,
//     color
// })
// const isPlayer = (piece, player) => 
//{ player, isEmpty, color}
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