const NUM_ROWS = 3;
const NUM_COLS = 3;
const NUM_TILES = NUM_ROWS * NUM_COLS;
// index of the empty tile
const EMPTY_INDEX = NUM_TILES - 1;
// defines the minimum and maximum number of random moves to scramble the puzzle board
const SHUFFLE_MOVES_RANGE = [60, 80];
const MOVE_DIRECTIONS = ['up', 'down', 'left', 'right'];

function rand (min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

console.log("test")