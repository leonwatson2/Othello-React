import { PLAY_MOVE, RESET_BOARD, NEXT_PLAYER, FLIP_PIECES, UPDATE_GAME_OVER, TOGGLE_SHOW_MOVES } from "./actionTypes";

export const playMove = (position, player) => {
   return {
    type: PLAY_MOVE,
    payload: {
      position,
      player
    }
  }
}

export const flipPieces = (positions) => ({
  type: FLIP_PIECES,
  payload: {
    positions
  }
})
export const resetBoard = () => ({
  type: RESET_BOARD
})

export const nextPlayer = (player) => ({
  type: NEXT_PLAYER,
  payload: player
})

export const updateGameOver = (isGameOver) => ({
    type:UPDATE_GAME_OVER,
    payload: isGameOver
})

export const toggleShowMoves = () => ({
  type:TOGGLE_SHOW_MOVES
})