import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Player } from '../utils';
import PropTypes from 'prop-types'

export class Scores extends Component {
  static propTypes = {
    count: PropTypes.shape({
      white: PropTypes.number,
      black: PropTypes.number
    }).isRequired,
    currentPlayer: PropTypes.oneOf([Player.BLACK, Player.WHITE]).isRequired
  }
  render() {
    const { count, currentPlayer } = this.props
    const isWhite = currentPlayer === Player.WHITE
    return [
      <div key={ Player.WHITE } className={`score score--white ${isWhite ? 'score--active':''}`}><span> {count.white}</span></div>,      
      <div key={ Player.BLACK } className={`score score--black ${isWhite ? '':'score--active'}`}><span> {count.black}</span></div>
    ]
  }
}

const mapStateToProps = state => ({
  currentPlayer: state.player.currentPlayer,
  count: state.board.count  
})

export default connect(mapStateToProps)(Scores)