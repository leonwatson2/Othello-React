import { NEXT_PLAYER } from "../actionTypes";
import { Player } from "../../utils";

const initialState = {
  currentPlayer:Player.BLACK
}

export default function playerReducer(state = initialState, action){
  switch (action.type) {
  case NEXT_PLAYER:
    return {
            ...state,
            currentPlayer: action.payload 
          }


  default:
    return state
  }
}
