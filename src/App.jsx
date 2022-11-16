import React from 'react'
import './utils/index'

class GameState {
  // singleton with static property
  static instance = null;

  // return current instance if exists if not create a new instance
  static getInstance () {
    if (!GameState.instance) GameState.instance = new GameState();
    return GameState.instance;
  }

  //static property called solvedBoard which will store the solved state of the board.
  static getNewBoard () {
    return Array(NUM_TILES).fill(0).map((x, index) => [
      Math.floor(index / NUM_ROWS), 
      index % NUM_COLS
    ]);
  }

  static solvedBoard = GameState.getNewBoard();

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
