# Othello

## Objects
1. Game
    - Board
    - CurrentTurn
    - 
    - isOver
2. Board
    - isFull => boolean
    + placePiece(Piece, position) => void
    - hasAdjacentOpponent(Piece, position) => boolean
    - willFlankOpponent(Piece, position) => boolean 
    - canPlacePiece(position) => boolean
    - getFlankedDiscs(Piece, position) => [positions] 
    - flipPieces([position]) => void
    - countPieces(Piece=) => [black:number, white:number] | number 


2. Piece
    - Black
    - White
