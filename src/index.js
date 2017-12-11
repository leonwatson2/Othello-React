import React from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.css';
import './index.css';

import Game from './game/Game';
import store from './store/index'
import { Provider } from 'react-redux';

ReactDOM.render(<Provider store={store}> 
                  <Game />
                  </Provider>, document.getElementById('root'));

// import registerServiceWorker from './registerServiceWorker';
// registerServiceWorker();