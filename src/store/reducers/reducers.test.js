import { createArray, Player } from "../../utils";
import boardReducer, { createStartBoard } from "./boardReducer";
import { PLAY_MOVE, RESET_BOARD, NEXT_PLAYER } from "../actionTypes";
import playerReducer from "./playerReducer";
import { flipPieces } from "../actions";

describe('board reducer', ()=>{

  it('should have the intial board', ()=>{
    expect(boardReducer(undefined, {}).board).toEqual(createStartBoard())
  })
  it('should update position 1, 1 on board to black', ()=>{
    const fakeState = { board: createArray("", 8, 8) }
    const action =  { 
                type: PLAY_MOVE, 
                payload: {
                  player: "black",
                  position: [1, 1]
                }
              }
    let expectedState = { board: createArray("", 8, 8) }
        expectedState.board[1][1] = "black"
    expect(boardReducer( fakeState, action)).toEqual(expectedState)
  })
  it('should update position 4, 2 on board to black', ()=>{
    const fakeState = { board: createArray("", 8, 8) }
    const action =  { 
                type: PLAY_MOVE, 
                payload: {
                  player: "black",
                  position: [4, 2]
                }
              }
    let expectedState = { board:createArray("",8,8) }
        expectedState.board[4][2] = "black"
    expect(boardReducer( fakeState, action)).toEqual(expectedState)
  })
  it('should return same state', ()=>{
    const fakeState = { board: createArray("", 8, 8) }
    const action =  { 
      type: PLAY_MOVE, 
      payload: {
        player: "black",
        position: [8, 8]
      }
    }
    expect(boardReducer(fakeState, action)).toEqual(fakeState)    
  })
  it('should reset the board to empty', ()=>{
    const fakeState = { board: createArray("black", 8, 8) }
    const action = {
      type: RESET_BOARD
    }
    const expectedState = {
      board: createStartBoard()
    }
    expect(boardReducer(fakeState, action)).toEqual( expectedState )
  })
  it('should update lastFlippedPieces to flipped pieces', ()=>{
    const flippedPieces = [[1,2],[3,4],[5,6]]
    const fakeState = { 
      board: createArray("", 8, 8),
      lastFlippedPieces: flippedPieces
    }
    const result = boardReducer(fakeState, flipPieces(flippedPieces))
    expect(result.lastFlippedPieces).toEqual(flippedPieces)
  })
  it('should flip player pieces to white', ()=>{
    const flippedPiecesCases = [
        [[1,1], [2,2], [0,0]],
        [[0,1], [1,2], [0,2]],
        [[1,1], [1,0]]
      ]
    flippedPiecesCases.map((flippedPieces)=>{
      const fakeState = {
        board: createArray(Player.BLACK, 3, 3),
        lastFlippedPieces: []
      }
      let expectedBoard =  createArray(Player.BLACK, 3, 3)
      flippedPieces.map(([row, column])=>{
        expectedBoard[row][column] = Player.WHITE
      })
      const result = boardReducer( fakeState, flipPieces( flippedPieces ) )
      expect(result.board).toEqual( expectedBoard )
    })
  })

   
})

describe('player reducer', ()=>{
  it('should have the player 1 as initial player', ()=>{
    const expectedState = {
      currentPlayer: Player.BLACK
    }
    expect( playerReducer(undefined, {}) ).toEqual( expectedState )
  })
  it('should change the player to black', ()=>{
    const fakeState = {
      currentPlayer: Player.WHITE
    }
    const expectedState = {
      currentPlayer: Player.BLACK
    }
    const action = {
      payload: Player.BLACK,
      type: NEXT_PLAYER
    }
    expect( playerReducer( fakeState,  action)).toEqual( expectedState )
  })
})