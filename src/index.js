import React from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.css';
import './index.css';
import Game from './Game';
// import registerServiceWorker from './registerServiceWorker';
import store from './store/index'
import { PLAY_MOVE } from './store/actionTypes';
import { playMove, resetBoard } from './store/actions';
import { Player } from './utils';

ReactDOM.render(<Game />, document.getElementById('root'));
// registerServiceWorker();
console.log(store.getState())
store.subscribe(() =>
  console.log(store.getState().board)
)
store.dispatch(playMove([0, 1], Player.BLACK ))
store.dispatch(resetBoard())