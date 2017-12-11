import React, { Component } from 'react'
import PropTypes from 'prop-types'


const ANIMATION_DELAY = 200

export default class Piece extends Component {
  static propTypes = {
    color: PropTypes.string,
    onClick: PropTypes.func,
    playable: PropTypes.bool,
    flipDelay: PropTypes.number
  }

  render() {
    const { color, onClick, playable, flipDelay } = this.props
    return (
      <div className={`${playable ? 'playable' : ''} box`}
          onClick={onClick} 
            style={{background:color, 'transitionDelay': `${flipDelay * ANIMATION_DELAY}ms`}}></div>
    )
  }
}
