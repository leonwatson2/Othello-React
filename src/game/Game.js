import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Player, getNextPlayer, findPlayableSpots } from '../utils' 
import FontAwesome from 'react-fontawesome'
import Board from './Board'
import Menu from './Menu'
import Footer from './Footer'
import { nextPlayer, toggleShowMoves, resetBoard } from '../store/actions';

import '../App.css';
import '../../node_modules/materialize-css/dist/css/materialize.min.css'

class Game extends Component {
  
  switchPlayer = () => {
    const { currentPlayer } = this.props

    this.props.switchPlayer( getNextPlayer(currentPlayer) )
  }

  restartBoard = () => {
    this.props.resetGame()
  }
  render() {
    const { currentPlayer, count, isGameOver, numberOfPlayableSpots }  = this.props
    const isWhite = currentPlayer === Player.WHITE
    return (
      <div className="App">
        <header className="App-header" > 
          <h1 className="App-title">Welcome to Othello in React </h1>
          {
            isGameOver &&
            <button className="btn btn-waves restart" onClick = { this.restartBoard }> Play Again </button>
          }
          {
            !isGameOver && numberOfPlayableSpots === 0 &&
            <button 
            className="btn btn-waves next-player" 
            onClick = { this.switchPlayer }> Next Player </button>
          }
        </header>
      <label htmlFor="options-toggle" className="options-button">
      <FontAwesome 
        name="navicon"
      />
      </label>
      <input type="checkbox" id="options-toggle"/>
      <Menu />
        <div className={`score score--white ${isWhite ? 'score--active':''}`}><span> {count.white}</span></div>      
        <div className={`score score--black ${isWhite ? '':'score--active'}`}><span> {count.black}</span></div>
        {
        <Board />
        }
          <Footer />
        </div>
    );
  }
}


const mapStateToProps = state => ({
  currentPlayer: state.player.currentPlayer,
  count: state.board.count,
  isGameOver: state.game.isGameOver,
  numberOfPlayableSpots: findPlayableSpots(state.board.board, state.player.currentPlayer).length
})

const mapDispatchToProps = dispatch =>({
  switchPlayer: bindActionCreators(nextPlayer, dispatch),
  toggleShowMoves: bindActionCreators( toggleShowMoves, dispatch ),
  resetGame: bindActionCreators( resetBoard, dispatch )
})
export default connect(mapStateToProps, mapDispatchToProps)(Game);
