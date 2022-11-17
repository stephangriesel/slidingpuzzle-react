import React from 'react'
import {rand} from './utils/index'

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
  static getInstance () {
    if (!GameState.instance) GameState.instance = new GameState();
    return GameState.instance;
  }

  // static method to generate board state. correct order: i-th at Math.floor(i / 3)th row and i % 3rd column.
  static getNewBoard () {
    return Array(NUM_TILES).fill(0).map((x, index) => [
      Math.floor(index / NUM_ROWS), 
      index % NUM_COLS
    ]);
  }

  //static property to store solved state board.
  static solvedBoard = GameState.getNewBoard();

  constructor () {
    this.startNewGame();
  }

  startNewGame () {
    this.moves = 0; // move counter set to 0
    this.board = GameState.getNewBoard();
    this.stack = [];
    this.shuffle(); // TODO: Create Method
  }

  shuffle () {
    // flag to shuffle board
    this.shuffling = true;

    // TODO: shuffle

    // reset flag
    this.shuffling = false;
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
