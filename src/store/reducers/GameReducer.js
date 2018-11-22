import { UPDATE_GAME_OVER, TOGGLE_SHOW_MOVES } from "../actionTypes";


const initialState = {
  isGameOver: false,
  showMoves: false
}

export default function gameReducer(state = initialState, action){
  switch (action.type) {

  case UPDATE_GAME_OVER:
    return { ...state, isGameOver: action.payload }
  case TOGGLE_SHOW_MOVES:
    return { ...state, showMoves: !state.showMoves }
  default:
    return state
  }
}
