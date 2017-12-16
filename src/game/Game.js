import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Player, getNextPlayer, findPlayableSpots } from '../utils' 
import Board from './Board'
import Menu from './Menu'
import Footer from './Footer'
import Scores from './Scores';
import { nextPlayer, toggleShowMoves, resetBoard, setMultiplayer } from '../store/actions';

import '../App.css';
import '../../node_modules/materialize-css/dist/css/materialize.min.css'

class Game extends Component {
  
  switchPlayer = () => {
    const { currentPlayer } = this.props

    this.props.switchPlayer( getNextPlayer(currentPlayer) )
  }
  componentWillMount = () => {
    if(this.props.match.params.filter){
      this.props.setMultiplayer(true)
    }
  }
  
  restartBoard = () => {
    this.props.resetGame()
  }
  render() {
    const { isGameOver, numberOfPlayableSpots }  = this.props
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
        <Menu />
        <Scores />
        <Board />
        <Footer />
      </div>
    );
  }
}


const mapStateToProps = state => ({
  isGameOver: state.game.isGameOver,
  numberOfPlayableSpots: findPlayableSpots(state.board.board, state.player.currentPlayer).length
})

const mapDispatchToProps = dispatch =>({
  switchPlayer: bindActionCreators(nextPlayer, dispatch),
  toggleShowMoves: bindActionCreators( toggleShowMoves, dispatch ),
  resetGame: bindActionCreators( resetBoard, dispatch ),
  setMultiplayer: bindActionCreators( setMultiplayer, dispatch )
})
export default connect(mapStateToProps, mapDispatchToProps)(Game);
