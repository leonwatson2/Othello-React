import React from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.css';
import './index.css';

import Game from './game/Game';
import store from './store/index'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
ReactDOM.render(<Provider store={store}> 
                  <Router>
                      <Switch>
                        <Route path="/game/:filter" component={Game} />
                        <Route path="*" component={Game} />
                      </Switch>
                  </Router>
                  </Provider>, document.getElementById('root'));

// import registerServiceWorker from './registerServiceWorker';
// registerServiceWorker();