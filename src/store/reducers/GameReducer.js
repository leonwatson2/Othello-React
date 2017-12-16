import { UPDATE_GAME_OVER, TOGGLE_SHOW_MOVES, SET_MULTIPLAYER } from "../actionTypes";


const initialState = {
  isGameOver: false,
  showMoves: false,
  isMultiplayer: false
}

export default function gameReducer(state = initialState, action){
  switch (action.type) {

  case UPDATE_GAME_OVER:
    return { ...state, isGameOver: action.payload }
  case TOGGLE_SHOW_MOVES:
    return { ...state, showMoves: !state.showMoves }
  case SET_MULTIPLAYER:
    return { ...state, isMultiplayer:action.payload }
  default:
    return state
  }
}
