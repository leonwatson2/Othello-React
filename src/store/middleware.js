import { PLAY_MOVE, BAD_MOVE, FLIP_PIECES } from './actionTypes';
import { willFlankOpponent, hasAdjacentOpponent, getNextPlayer, isGameOver } from '../utils';
import { flipPieces, nextPlayer, updateGameOver } from './actions';

export const othelloMiddleWare = store => next => action => {
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