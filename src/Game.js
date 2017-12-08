import React, { Component } from 'react';
import './App.css';
import '../node_modules/materialize-css/dist/css/materialize.min.css'
import { createArray, Player, hasAdjacentOpponent, willFlankOpponent } from './utils' 
import { version } from '../package.json'
import FontAwesome from 'react-fontawesome'

const BOARD_SIZE = 8
const initialBoard = () => createArray(Player.EMPTY, BOARD_SIZE, BOARD_SIZE)
const initialPlayer = Player.BLACK
const DEBUG = false
const ANIMATION_DELAY = 200

class Game extends Component {
  constructor(){
    super()
    this.state = {
      board: initialBoard(),
      currentPlayer: Player.BLACK,
      playableSpots: [],
      boardHistory: [],
      lastFlippedPieces: [],
      options:{
        showMoves: false
      },
      isGameOver: false
    }
  }
  
  componentWillMount() {
    this.restartBoard()
    this.updatePlayableSpots()
  }
  
  toggleShowMoves = ()=>{
    const { options } = this.state
    const newOptions = {
      ...options,
      showMoves: !options.showMoves
    }
    this.setState({ options: newOptions })
  }
  addToHistory(board){
    const { boardHistory } = this.state
    this.setState({ boardHistory: [...boardHistory, board] })
  }
  
  componentDidUpdate(prevProps, prevState) {
    const { currentPlayer, options:{ showMoves } } = this.state
    if(prevState.currentPlayer !== currentPlayer || prevState.options.showMoves !== showMoves)
      this.updatePlayableSpots()
  }
  checkGameOver = ()=>{
    const { board, currentPlayer } = this.state
    if(this.isGameOver(board, currentPlayer))
      this.setState({ isGameOver: true })
    else
      this.setState({ isGameOver: false })
  }
  
  updatePlayableSpots(){
    const { board, currentPlayer } = this.state
      this.setState({playableSpots: this.findPlayableSpots(board, currentPlayer)})    
  }  

  placePiece = ([x, y], player = this.state.currentPlayer, switchPlayers = true)=>{
    let { board } = this.state
    let newBoard = [...board]
    if(!switchPlayers){
      newBoard[x][y] = player
      this.setState( { board:newBoard, playableSpots: this.findPlayableSpots(board, player) } )
    }
    const doesFlank = willFlankOpponent(board, player, [x, y])
    if((hasAdjacentOpponent(board, player, [x, y]) && doesFlank)){
      newBoard[x][y] = player
      this.addToHistory(board)
      this.setState( { board:newBoard, lastFlippedPieces:doesFlank } )
      this.switchPlayer()
      this.flipPieces(doesFlank)
    }
   
    if(DEBUG){
      newBoard[x][y] = player
      this.setState( { board:newBoard } )
      this.switchPlayer()      
    }
    this.checkGameOver()
        
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
  isGameOver = (board, currentPlayer) => {
    const otherPlayer = Player.WHITE === currentPlayer ? Player.BLACK : Player.WHITE
    const { blackPieces, whitePieces } = this.countPieces(board)
    const totalPieces = blackPieces + whitePieces
    const maxPieces = Math.pow(board.length, 2)
    if(totalPieces === maxPieces){
      return true
    }
    const numberOfPlayableSpots = this.findPlayableSpots(board, currentPlayer).length
    const numberOfOtherPlayableSpots = this.findPlayableSpots(board, otherPlayer).length

    if(numberOfPlayableSpots === 0 && numberOfOtherPlayableSpots === 0){
      return true
    }
    return false
  }
  countPieces = (board)=>{
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
    positions.forEach(([x, y]) => {
      let player = board[x][y]
      board[x][y] = player === Player.BLACK ? Player.WHITE : Player.BLACK
      this.setState({ board })
    })
  } 
  switchPlayer = () => {
    const { currentPlayer } = this.state
    if(!DEBUG){
      const nextPlayer = currentPlayer === Player.BLACK ? Player.WHITE : Player.BLACK
      this.setState({ currentPlayer: nextPlayer })
    }else{
      let nextPlayer;
      switch(currentPlayer){
        case Player.BLACK:
          nextPlayer = Player.WHITE
          break
        case Player.WHITE:
          nextPlayer = Player.EMPTY
          break;
        default:
          nextPlayer = Player.BLACK
      }
      this.setState({ currentPlayer: nextPlayer })
    }

  }

  restartBoard = () => {
    this.setState({ board: initialBoard(), currentPlayer: initialPlayer, playableSpots: [] }, ()=>{
      this.placePiece([3, 3], Player.BLACK, false)
      this.placePiece([3, 4], Player.WHITE, false)
      this.placePiece([4, 3], Player.WHITE, false)
      this.placePiece([4, 4], Player.BLACK, false)
    }) 
  }
  render() {
    const { board, currentPlayer, playableSpots, options:{ showMoves }, isGameOver, lastFlippedPieces } = this.state
    const count = this.countPieces(board)
    const isWhite = currentPlayer === Player.WHITE
    return (
      <div className="App">
        <header className="App-header" >
          <h1 className="App-title">Welcome to Othello in React </h1>
          {
            isGameOver && 
            <button className="btn btn-waves restart" onClick = { this.restartBoard }> Play Again </button>
          }
          {
            (!isGameOver || DEBUG) && playableSpots.length === 0 &&
            <button 
            className="btn btn-waves next-player" 
            onClick = { this.switchPlayer }> Next Player </button>
          }
        </header>
      <label htmlFor="options-toggle" className="options-button">
      <FontAwesome 
        name="navicon"
      />
      </label>
      <input type="checkbox" id="options-toggle"/>
      <div className="options">
        <div className="collection">
        <div className="collection-item option" 
              onClick={ this.toggleShowMoves }>{ !showMoves ? 'Show' : 'Hide' } Moves</div>
        <label className="collection-item" htmlFor="options-toggle">Close</label>
        </div>
        <div className="version">v{version}</div>
      </div>
        <div className={`score score--white ${isWhite ? 'score--active':''}`}><span> {count.white}</span></div>      
        <div className={`score score--black ${isWhite ? '':'score--active'}`}><span> {count.black}</span></div>
        {
        <Board board = { board } 
                playableSpots = { showMoves ? playableSpots : [] } 
                placePiece = { this.placePiece }
                lastFlippedPieces = { lastFlippedPieces }/>
        }
          <div className="footer">
            <div className="social-icons">
                <a target="_blank"
                    href="https://github.com/vlw0052/Othello-React"
                    rel="noopener noreferrer">
                  <FontAwesome 
                    name="github"
                    size="3x"
                    />
                </a>
                <a target="_blank"
                    href="https://twitter.com/_leonwatson2"
                    rel="noopener noreferrer">
                  <FontAwesome 
                    name="twitter"
                    size="3x"
                  />
                </a>
            </div>
          <div className="creator">Developed By: Leon Watson</div>
          </div>
        </div>
    );
  }
}
const Piece = ({ color, onClick, playable, flipDelay })=>{
  return (
    <div className={`${playable ? 'playable' : ''} box`} 
          onClick = {onClick} 
          style={{background:color, 'transitionDelay': `${flipDelay * ANIMATION_DELAY}ms`}}></div>
  )
}

class Board extends Component{
  render(){
      const { board, playableSpots, lastFlippedPieces } = this.props
    return(
        <div className="board">
        {
          board.map((row, x) => {
            return row.map((color, y) =>(
              <Piece key={[x, y]} 
                playable = { playableSpots.filter(([xed,zed])=> xed === x && zed === y).length > 0 } 
                onClick={()=>{ this.props.placePiece([x, y]) } } 
                color = { color } 
                flipDelay = { (lastFlippedPieces.findIndex(([xed,zed]) => x === xed && y === zed) + 1) } />)
            )
          })
        }
      </div>
    )
  }
}


export default Game;
