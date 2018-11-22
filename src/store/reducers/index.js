import boardReducer from "./boardReducer";
import { combineReducers } from 'redux'
import playerReducer from "./playerReducer";
import gameReducer from "./GameReducer";

export default combineReducers({ 
                                board:boardReducer, 
                                player:playerReducer,
                                game:gameReducer 
                              })