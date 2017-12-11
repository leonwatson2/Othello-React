import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { version } from '../../package.json'
import { connect } from 'react-redux';
import { toggleShowMoves } from '../store/actions';
import { bindActionCreators } from 'redux';

export class Menu extends Component {
  static propTypes = {
    showMoves: PropTypes.bool,
    toggleShowMoves: PropTypes.func
  }

  render() {
    const { showMoves, toggleShowMoves } = this.props
    return (
      <div className="options">
        <div className="collection">
        <div className="collection-item option" 
              onClick={ toggleShowMoves }>{ !showMoves ? 'Show' : 'Hide' } Moves</div>
        <label className="collection-item" htmlFor="options-toggle">Close</label>
        </div>
        <div className="version">v{version}</div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  showMoves: state.game.showMoves
})
const mapDispatchToProps = dispatch =>({
  toggleShowMoves: bindActionCreators(toggleShowMoves, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu)