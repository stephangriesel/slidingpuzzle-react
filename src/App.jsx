import React, { useState } from 'react'
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
    // flat to shuffle board
    this.shuffling = true;
    let shuffleMoves = rand(...SHUFFLE_MOVES_RANGE);
    while (shuffleMoves-- > 0) { //  post decrement operator -- followed by the greater than operator > (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Decrement)
      this.moveInDirection(MOVE_DIRECTIONS[rand(0, 2)]);
    }

    // reset shuffle
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
    for (let i = 0; i < NUM_TILES; i++) {
      if (this.board[i][0] !== GameState.solvedBoard[i][0]
        || this.board[i][1] !== GameState.solvedBoard[i][1])
        return false;
    }
    return true;
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
  getState() {
    // this refer to object created, not current gamestate
    // store context in constant 'self'
    const self = this;

    return {
      board: self.board,
      moves: self.moves,
      solved: self.isSolved(),
    };
  }
}

function useGameState() {
  // current GameState instance
  const gameState = GameState.getInstance();

  // state from GameState instance
  const [state, setState] = useState(gameState.getState());

  // new game and update state
  function newGame() {
    gameState.startNewGame();
    setState(gameState.getState());
  }

  // undo latest move and update state
  function undo() {
    gameState.undo();
    setState(gameState.getState());
  }

  // function move i-th tile\
  // update state
  function move(i) {
    return function () {
      gameState.moveTile(i);
      setState(gameState.getState());
    }
  }

  return [state.board, state.moves, state.solved, newGame, undo, move];
}

function Tile ({index, pos, onClick}) {
  const top = pos[0]*100 + 5;
  const left = pos[1]*100 + 5;
  const bgLeft = (index%4)*100 + 5;
  const bgTop = Math.floor(index/4)*100 + 5;

  return <div 
    className='tile'
    onClick={onClick}
    style={{top, left, backgroundPosition: `-${bgLeft}px -${bgTop}px`}} 
  />;
}

const App = () => {
  const [board, moves, solved, newGame, undo, move] = useGameState();

  return (
    <div className="App grid place-content-center">
      <div className="place-content-center h-32">
        <div className='moves'>
          {moves}
        </div>
        <button onClick={undo}>UNDO</button>
      </div>
      <div className='board'>
      {
        board.slice(0,-1).map((pos, index) => ( 
          <Tile index={index} pos={pos} onClick={move(index)} />
        ))
      }
      { solved &&
          <div className='overlay'>
            <button className='big-button' onClick={newGame}>
              PLAY AGAIN 
            </button>
          </div>
      }
      </div>
    </div>
  )
}

export default App
