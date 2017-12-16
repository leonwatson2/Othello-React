import React, {Component} from 'react'
import { connect } from "react-redux";
import { findPlayableSpots, Player } from '../utils';
import Piece from './Piece'
import { playMove } from '../store/actions';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types'
class Board extends Component{
  static propTypes = {
    board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    playableSpots: PropTypes.array.isRequired,
    lastFlippedPieces: PropTypes.array.isRequired,
    currentPlayer: PropTypes.oneOf([
      Player.BLACK,
      Player.WHITE
    ]).isRequired
  }
  render(){
      const { board, playableSpots, lastFlippedPieces, currentPlayer } = this.props
      console.log(currentPlayer)
    return(
        <div className="board">
        {
          board.map((row, x) => {
            return row.map((color, y) =>(
              <Piece key={[x, y]} 
                playable = { playableSpots.filter(([xed,zed])=> xed === x && zed === y).length > 0 } 
                onClick={()=>{ this.props.placePiece([x, y], currentPlayer) } } 
                color = { color } 
                flipDelay = { (lastFlippedPieces.findIndex(([xed,zed]) => x === xed && y === zed) + 1) } />)
            )
          })
        }
      </div>
    )
  }
}
const mapStateToProps = state =>({
  board:state.board.board,
  lastFlippedPieces: state.board.lastFlippedPieces,
  playableSpots: !state.game.showMoves ? [] : findPlayableSpots(state.board.board, state.player.currentPlayer),
  currentPlayer: state.player.currentPlayer
})
const mapDispatchToProps = (dispatch, ownProps) =>({
  placePiece:bindActionCreators(playMove, dispatch)
})
export default connect(mapStateToProps, mapDispatchToProps)(Board)
