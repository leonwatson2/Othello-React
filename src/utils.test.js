import { hasAdjacentOpponent, createArray, willFlankOpponent } from './utils'
function placePiecesAt(board, positions, piece){
    let newBoard = [...board]
    positions.map(([x, y])=>{
        newBoard[x][y] = piece
    })
    return newBoard
}
describe('hasAdjacentOpponent() test', ()=>{
    
    var board;
    const player = "Black"
    const opponent = "w"
    
    beforeEach(()=>{
        board = createArray("", 4, 4)
    })
    describe('checking adjacent places above for opponent', ()=>{
        const position = [1, 2];
        it('should return true for opponent being above', () => {
            board[0][2] = opponent
            const value = hasAdjacentOpponent(board, player, position)
            expect(value).toBe(true)
        })
        
        it('should return true for opponent top right', ()=>{
            board[0][3] = opponent
            const value = hasAdjacentOpponent(board, player, position)
            expect(value).toBe(true)
        })
        
        it('should return true for opponent top left', ()=>{
            board[0][1] = opponent
            const value = hasAdjacentOpponent(board, player, position)
            expect(value).toBe(true)
        })
        
        
    })
    
    describe('checking adjacent places on same row for opponent', ()=>{
        const position = [2, 2]
        it('should return true for opponent to the left', () => {
            board[2][1] = opponent
            const value = hasAdjacentOpponent(board, player, position)
            expect(value).toBe(true)
        })
        it('should return true for opponent to the right', () => {
            board[2][3] = opponent
            const value = hasAdjacentOpponent(board, player, position)
            expect(value).toBe(true)
        })
        it('should fail for opponent at same place', ()=>{
            board[2][2] = opponent
            const value = hasAdjacentOpponent(board, player, position)
            expect(value).toBe(false)
        })
    })

    describe('checking adjacent places on bottom row for opponent', ()=>{
        const position = [1, 1]        
        it('should return true for opponent being below', () => {
            board[2][1] = opponent
            const value = hasAdjacentOpponent(board, player, position)
            expect(value).toBe(true)
        })
        it('should return true for opponent being bottom right', () => {
            board[2][2] = opponent
            const value = hasAdjacentOpponent(board, player, position)
            expect(value).toBe(true)
        })
        it('should return true for opponent being bottom right', () => {
            board[2][0] = opponent
            const value = hasAdjacentOpponent(board, player, position)
            expect(value).toBe(true)
        })
    })

    describe('checking when on corners of boards', ()=>{
        it('should fail without assertion at top left', ()=>{
            const position = [0, 0]
            const value = hasAdjacentOpponent(board, player, position)
            expect(value).toBe(false)
        })
        it('should fail without assertion at bottom right', ()=>{
            const position = [3, 3]
            
            const value = hasAdjacentOpponent(board, player, position)
            expect(value).toBe(false)
        })
        it('should fail without assertion at bottom left', ()=>{
            const position = [3, 0]
            
            const value = hasAdjacentOpponent(board, player, position)
            expect(value).toBe(false)
        })
        it('should fail without assertion at top right', ()=>{
            const position = [0, 3]
            
            const value = hasAdjacentOpponent(board, player, position)
            expect(value).toBe(false)
        })
    })
    describe('checking when on edges of board', ()=>{
        const position = [0, 2]
        it('should pass without assertion at top', ()=>{            
            board[1][2] = opponent
            const value = hasAdjacentOpponent(board, player, position)
            expect(value).toBe(true)
        })
        it('should pass without assertion at bottom', ()=>{            
            board[1][1] = opponent
            const value = hasAdjacentOpponent(board, player, position)
            expect(value).toBe(true)
        })
    })
})
describe('willFlankOpponent() test', ()=>{
    var board
    const player = "Black"
    const opponent = "w"
    describe('flanks down right', ()=>{
        let position = [1, 2]
        beforeEach(()=>{
            board = createArray("", 7, 7)
           
        })
        it('should return false because first spot is blank', ()=>{
            const value = willFlankOpponent(board, player, position)
            expect(value).toBe(false)      
        })
        it('should return false because first spot is player', ()=>{
            board = placePiecesAt(board, [[2,3]], player)
            const value = willFlankOpponent(board, player, position)
            expect(value).toBe(false)
        })
        it('should return false because no player is found', ()=>{
            board = placePiecesAt(board, [[2,3],[3,4],[4,5],[5, 6]], opponent)
            const value = willFlankOpponent(board, player, position)
            expect(value).toBe(false)
        })

        it('should return the array of opponent\'s positions ', ()=>{
            let opponentPosition = [[2,3]]
            board = placePiecesAt(board, opponentPosition, opponent)
            board = placePiecesAt(board, [[3,4]], player)
            const value = willFlankOpponent(board, player, position)
            expect(value).toEqual(opponentPosition)
        })
        it('should return the array of opponent\'s positions', ()=>{
            let opponentPosition = [[4,5], [3,4], [2,3]]
            board = placePiecesAt(board, opponentPosition, opponent)
            board = placePiecesAt(board, [[5, 6]], player)
            const value = willFlankOpponent(board, player, position)
            expect(value).toEqual(opponentPosition)
        })
        it('should return the array of opponent\'s positions', ()=>{
            let opponentPosition = [[5, 6],[4,5], [3,4], [2,3]]
            board = placePiecesAt(board, opponentPosition, opponent)
            board = placePiecesAt(board, [[6, 7]], player)
            const value = willFlankOpponent(board, player, position)
            expect(value).toEqual(opponentPosition)
        })
    })
    describe('flanks down left', ()=>{
        let position = [0, 6]
        beforeEach(()=>{
            board = createArray("", 7, 7)
           
        })
        it('should return false because first spot is blank', ()=>{
            const value = willFlankOpponent(board, player, position)
            expect(value).toBe(false)      
        })
        it('should return the array of opponent\'s positions ', ()=>{
            let opponentPosition = [[1, 5]]
            board = placePiecesAt(board, opponentPosition, opponent)
            board = placePiecesAt(board, [[2, 4]], player)
            const value = willFlankOpponent(board, player, position)
            expect(value).toEqual(opponentPosition)
        })
        it('should return the array of opponent\'s positions ', ()=>{
            let opponentPosition = [[2, 4], [1, 5]]
            board = placePiecesAt(board, opponentPosition, opponent)
            board = placePiecesAt(board, [[3, 3]], player)
            const value = willFlankOpponent(board, player, position)
            expect(value).toEqual(opponentPosition)
        })
        it('should return the array of opponent\'s positions ', ()=>{
            let opponentPosition = [[5, 1], [4, 2], [3, 3], [2, 4], [1, 5]]
            board = placePiecesAt(board, opponentPosition, opponent)
            board = placePiecesAt(board,[[6, 0]], player)
            const value = willFlankOpponent(board, player, position)
            expect(value).toEqual(opponentPosition)
        })
    })
    describe('flanks left', ()=>{
        let position = [2, 2]
        beforeEach(()=>{
            board = createArray("", 7, 7)
           
        })
        it('should return the array of opponent\'s positions ', ()=>{
            let opponentPosition = [[1, 2]]
            board = placePiecesAt(board, opponentPosition, opponent)
            board = placePiecesAt(board, [[0, 2]], player)
            const value = willFlankOpponent(board, player, position)
            expect(value).toEqual(opponentPosition)
        })

        it('should return the array of opponent\'s positions ', ()=>{
            let opponentPosition = [[2, 3]]
            board = placePiecesAt(board, opponentPosition, opponent)
            board = placePiecesAt(board, [[2, 4]], player)
            const value = willFlankOpponent(board, player, position)
            expect(value).toEqual(opponentPosition)
        })
    })
    describe('flanks up', ()=>{
        let board = [
            ["","","","","","","",""],
            ["","","","","","","",""],
            ["","","","","","","",""],
            ["","","","black","black","black","",""],
            ["","","","white","black","","",""],
            ["","","","","","","",""],
            ["","","","","","","",""],
            ["","","","","","","",""]]
            it('should return the array of opponent\'s position', ()=>{
                let position = [5, 3]
                const value = willFlankOpponent(board, "black", position)
                expect(value).toEqual([[4, 3]])
            })
    })
})