
import {createStore, applyMiddleware} from  'redux'
import reducer from './reducers/'
import io from 'socket.io-client'
import { othelloMiddleWare } from './middleware';

let store = createStore( reducer, 
                          applyMiddleware( 
                            othelloMiddleWare 
                          ) 
                        )
export const serverUri = ""+window.location.hostname  + ":" + (process.env.PORT || 3001)
let socket = io.connect(serverUri);
console.log(serverUri)
socket.on('connect', (data) => {
  console.log("Connected")
});
socket.on('yes', (d)=>{
  console.log(d)
})

export default store