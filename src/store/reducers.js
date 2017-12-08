import { PLAY_MOVE, RESET_BOARD } from "./actionTypes";
import { createArray, Player } from "../utils";

const initialState = {
  board: createArray("", 8, 8),
  currentPlayer: Player.BLACK
}

export default (state = initialState, action) => {
 
  switch (action.type) {
  case PLAY_MOVE: 
    const { position, player } = action.payload
    return Object.assign({},state,{ 
      board: updateBoard(state.board, position, player) 
    })
  case RESET_BOARD:
    return Object.assign({}, state, {
      board: initialState.board
    })
  default:
    return state
  }
}

function updateBoard(board, position, player) {
  return board.map((row, x) => {
    const newRow = row.map((column, y) => {
      if (x === position[0] && y === position[1]) {
        return player;
      }
      return column;
    });
    return newRow;
  });
}

