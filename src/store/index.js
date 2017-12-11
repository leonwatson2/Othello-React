
import {createStore, applyMiddleware} from  'redux'
import reducer from './reducers/'
import logger from 'redux-logger'

import { othelloMiddleWare } from './middleware';

let store = createStore( reducer, 
                          applyMiddleware( 
                            logger, 
                            othelloMiddleWare 
                          ) 
                        )



export default store