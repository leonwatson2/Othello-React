import { PLAY_MOVE, RESET_BOARD, FLIP_PIECES, BAD_MOVE } from "../actionTypes";
import { createArray, Player, countPieces } from '../../utils'
import cloneDeep from 'lodash/cloneDeep'
const initialState = {
  board: createStartBoard(),
  lastFlippedPieces: [],
  count: { black: 2, white: 2 }
}

export default function boardReducer(state = initialState, action){
  switch (action.type) {
  case PLAY_MOVE: 
    const { position, player } = action.payload
    return { ...state, 
            board: updateBoardPlace(state.board, position, player) 
          }               
  case RESET_BOARD:
    return { ...state,
            board: initialState.board
          }    
  case FLIP_PIECES:
    const newBoard = flipBoardPieces(state.board, action.payload.positions)
    return {
        ...state,
        flipBoardPieces: action.payload.positions,
        board: newBoard,
        count: countPieces(newBoard)
    }
  case BAD_MOVE:
    console.log(`Bad move by ${action.payload.player} to ${action.payload.position}`)
    return state
  default:
    return state
  }
}

export function createStartBoard(){
  const board = createArray("", 8, 8)
  const startPlaces = [
    {position:[3, 3], player: Player.BLACK },
    {position:[4, 4], player: Player.BLACK },
    {position:[4, 3], player: Player.WHITE },
    {position:[3, 4], player: Player.WHITE }
  ]
  const startBoard = startPlaces.reduce((oldBoard, {position, player})=>{
    return updateBoardPlace(oldBoard, position, player)
  }, board)
  return startBoard
}
function flipBoardPieces(board, positions){
  return positions.reduce((oldBoard, [row, column])=>{
    if(board[row][column] === "")
      return oldBoard
    const otherPlayer  = board[row][column] === Player.BLACK ? Player.WHITE : Player.BLACK
    const newB =  updateBoardPlace(oldBoard, [row, column], otherPlayer)
    return newB
  }, board)
}
function updateBoardPlace(board, [updatedRow, updatedColumn], player) {
  let newBoard = cloneDeep(board)
  if( newBoard.length > updatedRow 
      && newBoard[updatedRow].length > updatedColumn){
    
    newBoard[updatedRow][updatedColumn] = player

  }
  return newBoard
}



