
import {createStore, applyMiddleware} from  'redux'
import reducer from './reducers/'
import logger from 'redux-logger'
import { PLAY_MOVE, BAD_MOVE, FLIP_PIECES } from './actionTypes';
import { willFlankOpponent, hasAdjacentOpponent, getNextPlayer, isGameOver } from '../utils';
import { flipPieces, nextPlayer, updateGameOver } from './actions';

const othelloMiddleWare = store => next => action => {
  const state = store.getState()
  const { board } = state.board 
  const { currentPlayer } = state.player
  
  if(action.type === PLAY_MOVE){
    
    const doesFlank = willFlankOpponent(board, currentPlayer, action.payload.position)
    if(hasAdjacentOpponent(board, currentPlayer, action.payload.position) && doesFlank){
      next(action)
      store.dispatch(flipPieces(doesFlank))
      store.dispatch(nextPlayer(getNextPlayer(currentPlayer)))
      
    }else{

      store.dispatch({ type: BAD_MOVE, payload: action.payload })
    }
  }else if(action.type === FLIP_PIECES){
    next(action)
    
    if(isGameOver(board, currentPlayer) !== state.game.isGameOver)
      store.dispatch(updateGameOver(!state.game.isGameOver))
  }else{
    next(action)
  }
}


let store = createStore( reducer, 
                          applyMiddleware( 
                            logger, 
                            othelloMiddleWare 
                          ) 
                        )



export default store