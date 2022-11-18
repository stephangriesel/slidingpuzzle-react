import React from 'react'
import { rand } from './utils/index'

// set grid
const NUM_ROWS = 3;
const NUM_COLS = 3;
const NUM_TILES = NUM_ROWS * NUM_COLS;
// index of the empty tile
const EMPTY_INDEX = NUM_TILES - 1;
// defines the minimum and maximum number of random moves to scramble the puzzle board
const SHUFFLE_MOVES_RANGE = [60, 80];
// direction of cards
const MOVE_DIRECTIONS = ['up', 'down', 'left', 'right'];

class GameState {
  // singleton with static property
  static instance = null;

  // return current instance if exists if not create a new instance.
  static getInstance() {
    if (!GameState.instance) GameState.instance = new GameState();
    return GameState.instance;
  }

  // static method to generate board state. correct order: i-th at Math.floor(i / 3)th row and i % 3rd column.
  static getNewBoard() {
    return Array(NUM_TILES).fill(0).map((x, index) => [
      Math.floor(index / NUM_ROWS),
      index % NUM_COLS
    ]);
  }

  //static property to store solved state board.
  static solvedBoard = GameState.getNewBoard();

  constructor() {
    this.startNewGame();
  }

  startNewGame() {
    this.moves = 0; // move counter set to 0
    this.board = GameState.getNewBoard();
    this.stack = [];
    this.shuffle(); // TODO: Create Method
  }

  shuffle() {
    // flag to shuffle board
    this.shuffling = true;

    // TODO: shuffle

    // reset flag
    this.shuffling = false;
  }

  canMoveTile(index) {
    // tile index invalid, set to false
    if (index < 0 || index >= NUM_TILES) return false;

    // current position tile and empty tile
    const tilePos = this.board[index];
    const emptyPos = this.board[EMPTY_INDEX];

    // set indices to 1 if same row
    if (tilePos[0] === emptyPos[0])
      return Math.abs(tilePos[1] - emptyPos[1]) === 1;

    // set indices to 1 if in same column
    else if (tilePos[1] === emptyPos[1])
      return Math.abs(tilePos[0] - emptyPos[0]) === 1;

    // if conditions above not met set to false
    else return false;
  }

  moveTile(index) {
    // not shuffling and board already solved
    // TODO: replace stub
    if (!this.shuffling && this.isSolved()) return false;

    // not possible to move to first place
    if (!this.canMoveTile(index)) return false;

    // position of tile & empty tile
    const emptyPosition = [...this.board[EMPTY_INDEX]];
    const tilePosition = [...this.board[index]];

    // copy & swop positions
    let boardAfterMove = [...this.board];
    boardAfterMove[EMPTY_INDEX] = tilePosition;
    boardAfterMove[index] = emptyPosition;

    // update board, move counter & stack
    if (!this.shuffling) this.stack.push(this.board);
    this.board = boardAfterMove;
    if (!this.shuffling) this.moves += 1;

    return true;
  }

  isSolved() {
    return false; // stub
  }

  // undo
  undo() {
    if (this.stack.length === 0) return false;
    this.board = this.stack.pop();
    this.moves -= 1;
  }

  moveInDirection(dir) {
    // empty square position
    const epos = this.board[EMPTY_INDEX];

    // move tile into place when selected tile moved
    const posToMove = dir === 'up' ? [epos[0] + 1, epos[1]]
      : dir === 'down' ? [epos[0] - 1, epos[1]]
        : dir === 'left' ? [epos[0], epos[1] + 1]
          : dir === 'right' ? [epos[0], epos[1] - 1]
            : epos;

    // find index tile in posToMove
    let tileToMove = EMPTY_INDEX;
    for (let i = 0; i < NUM_TILES; i++) {
      if (this.board[i][0] === posToMove[0] && this.board[i][1] === posToMove[1]) {
        tileToMove = i;
        break;
      }
    }

    // move tile
    this.moveTile(tileToMove);
  }

}

const App = () => {
  return (
    <div className="App grid place-content-center">
      <div className="grid grid-cols-3 gap-4 place-content-center h-48">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
        <div>8</div>
        <div>9</div>
      </div>
    </div>
  )
}

export default App
