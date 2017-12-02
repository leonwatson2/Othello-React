import React, { Component } from 'react';
import './App.css';
import { createArray, Player, hasAdjacentOpponent, willFlankOpponent } from './utils' 

class Game extends Component {
  constructor(){
    super()
    this.state = {
      board: createArray("", 8, 8),
      currentPlayer: Player.BLACK,
      playableSpots: []
    }
  }
  
  componentWillMount() {
    this.restartBoard()
    this.updatePlayableSpots()
  }
  
  
  componentDidUpdate(prevProps, prevState) {
    const { currentPlayer } = this.state
    if(prevState.currentPlayer !== currentPlayer)
      this.updatePlayableSpots()
    
  }
  
  
  updatePlayableSpots(){
    const { board, currentPlayer } = this.state
    console.log(board, currentPlayer)
    this.setState({playableSpots: this.findPlayableSpots(board, currentPlayer)})    
  }  
  placePiece = ([x, y], player = this.state.currentPlayer, switchPlayers = true)=>{
    let { board } = this.state
    if(!switchPlayers){
      board[x][y] = player
      this.setState( { board } )
    }
    const doesFlank = willFlankOpponent(board, player, [x, y])
    if(hasAdjacentOpponent(board, player, [x, y]) && doesFlank){
      board[x][y] = player
      console.log(board)
      this.setState( { board } )
      this.switchPlayer()
      this.flipPieces(doesFlank)
    }
        
  }
  findPlayableSpots = (board, currentPlayer)=>{
    const playableSpots = board.reduce( (allPositions, row, i) => {
        const rowValues = row.reduce((positions, piece, j) => {
          if(hasAdjacentOpponent(board, currentPlayer, [i,j]) && willFlankOpponent(board, currentPlayer, [i, j])){
            return [...positions, [i, j]]
          }
          return positions
        }, [])
        return [...allPositions, ...rowValues]
      }, [])
      return playableSpots
  }
  
  countPieces = ()=>{
    const { board } = this.state
    return board.reduce( (allSum, row) => {
        const rowValue = row.reduce((sum, piece) => {
          if(piece === Player.BLACK){
            return { ...sum, black: sum.black + 1 }
          }
          else if(piece === Player.WHITE)
          return { ...sum, white: sum.white + 1}
          else return sum
        }, {black:0, white:0})
        return { black: allSum.black + rowValue.black, white: allSum.white + rowValue.white}
      }, {black:0, white:0})
  }
  flipPieces = (positions) => {
    let { board } = this.state
    positions.map(([x, y]) => {
      let player = board[x][y]
      board[x][y] = player === Player.BLACK ? Player.WHITE : Player.BLACK
      return []
    })
    this.setState({ board })
  } 
  switchPlayer(){
    const { currentPlayer } = this.state
     const nextPlayer = currentPlayer === Player.BLACK ? Player.WHITE : Player.BLACK
    this.setState({ currentPlayer: nextPlayer })
  }

  restartBoard(){
    this.placePiece([3, 3], Player.BLACK, false)
    this.placePiece([3, 4], Player.WHITE, false)
    this.placePiece([4, 3], Player.WHITE, false)
    this.placePiece([4, 4], Player.BLACK, false)
  }
  render() {
    const { board, currentPlayer, playableSpots } = this.state
    const count = this.countPieces()
    return (
      <div className="App">
        <header className="App-header" style={{background : currentPlayer}}>
          <h1 className="App-title">Welcome to Othello in React</h1>
        </header>

      <h3 className="count">Black:{count.black}</h3>
      <h3 className="count">White:{count.white}</h3>      
        {<Board board = { board } playableSpots = { playableSpots } placePiece = { this.placePiece }/>
        }
        </div>
    );
  }
}
const Piece = ({color, onClick, playable})=>{
  return (
    <div className={`${playable ? 'playable' : ''} box`} onClick = {onClick} style={{background:color}}></div>
  )
}

class Board extends Component{
  render(){
      const { board, playableSpots } = this.props
    return(
        <div className="board">
        {
          board.map((row, x) => {
            return row.map((color, y) =>(
              <Piece key={[x, y]} 
                playable = { playableSpots.filter(([xed,zed])=> xed === x && zed === y).length > 0 } 
                onClick={()=>{ this.props.placePiece([x, y]) } } 
                color = { color } />)
            )
          })
        }
      </div>
    )
  }
}


export default Game;
