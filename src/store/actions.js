import { PLAY_MOVE, RESET_BOARD } from "./actionTypes";

export const playMove = (position, player) => ({
  type: PLAY_MOVE,
  payload: {
    position,
    player
  }
})

export const resetBoard = () => ({
  type: RESET_BOARD
})