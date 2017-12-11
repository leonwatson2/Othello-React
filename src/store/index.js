
import {createStore, applyMiddleware} from  'redux'
import reducer from './reducers/'

import { othelloMiddleWare } from './middleware';

let store = createStore( reducer, 
                          applyMiddleware( 
                            othelloMiddleWare 
                          ) 
                        )



export default store