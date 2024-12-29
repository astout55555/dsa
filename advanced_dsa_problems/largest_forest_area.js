// You are provided with an 'm x n' 2D grid map where each cell
// is either marked as a tree ('T') or open land ('O'). Your task
//  is to find the largest contiguous forest area on the map. A 
// forest area consists of a group of tree cells ('T') connected
// 4-directionally (horizontally or vertically, but not diagonally).

// Write a function largestForestArea that accepts a nested
// array grid representing the 2D map. The function should
// return the size of the largest forest area, which is the
// number of contiguous 'T' cells in the largest forest.
// If there are no trees in the grid, return 0.

// Example:
// Input:
// [
//   ['O', 'T', 'O', 'O'],
//   ['T', 'T', 'O', 'T'],
//   ['O', 'O', 'O', 'T'],
//   ['O', 'O', 'T', 'T']
// ]
// Output: 4 (The largest forest area has 4 connected tree cells)

// should work for square grids -- all tests are square grids
function largestForestArea(grid) {
  if (!grid || grid.length === 0) return 0;

  const numRows = grid.length;
  const numCols = grid[0].length;

  let largestForestSize = 0;
  let forestSize;

  function dfs(row, col) {
    if (
      row < 0 || row >= numRows || col < 0 || col >= numCols ||
      grid[row][col] === 'O'
    ) {
      return;
    }

    grid[row][col] = 'O'; // cut the tree so we don't revisit it
    forestSize += 1; // count the tree for this forest

    dfs(row, col - 1);
    dfs(row - 1, col);
    dfs(row, col + 1);
    dfs(row + 1, col);
  }

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      if (grid[row][col] === 'T') {
        forestSize = 0;
        dfs(row, col);
        if (largestForestSize < forestSize) {
          largestForestSize = forestSize;
        }
      }
    }
  }

  return largestForestSize;
}

// Test cases
const grid1 = [];
console.log(largestForestArea(grid1) === 0);

const grid2 = [
  ['O', 'O', 'O'],
  ['O', 'O', 'O'],
  ['O', 'O', 'O']
];
console.log(largestForestArea(grid2) === 0);

const grid3 = [
  ['T', 'T', 'O'],
  ['T', 'T', 'O'],
  ['O', 'O', 'O']
];
console.log(largestForestArea(grid3) === 4);

const grid4 = [
  ['O', 'O', 'T', 'T', 'O'],
  ['T', 'T', 'O', 'T', 'O'],
  ['T', 'T', 'O', 'O', 'O'],
  ['O', 'O', 'O', 'T', 'T'],
  ['O', 'O', 'O', 'O', 'O'],
];
console.log(largestForestArea(grid4) === 4);

const grid5 = [
  ['T', 'T', 'T'],
  ['T', 'O', 'T'],
  ['T', 'T', 'T']
];
console.log(largestForestArea(grid5) === 8);

const grid6 = [
  ['T', 'O', 'T', 'O', 'T'],
  ['O', 'O', 'O', 'O', 'O'],
  ['T', 'O', 'T', 'O', 'T'],
  ['O', 'O', 'O', 'O', 'O'],
  ['T', 'O', 'T', 'O', 'T']
];
console.log(largestForestArea(grid6) === 1);

const grid7 = [
  ['T', 'T', 'T'],
  ['T', 'T', 'T'],
  ['T', 'T', 'T']
];
console.log(largestForestArea(grid7) === 9);

const grid8 = [
  ['O', 'T', 'O', 'T', 'T'],
  ['O', 'T', 'O', 'O', 'O'],
  ['O', 'O', 'T', 'O', 'O'],
  ['O', 'O', 'T', 'T', 'T'],
  ['T', 'O', 'T', 'T', 'T']
];
console.log(largestForestArea(grid8) === 7);

const grid9 = [
  ['T', 'O', 'T', 'T'],
  ['O', 'T', 'O', 'T'],
  ['T', 'T', 'O', 'O'],
  ['O', 'T', 'T', 'T']
];
console.log(largestForestArea(grid9) === 6);

const grid10 = [
  ['O', 'T', 'O', 'O'],
  ['T', 'T', 'O', 'T'],
  ['O', 'O', 'O', 'T'],
  ['O', 'O', 'T', 'T']
];
console.log(largestForestArea(grid10) === 4);

const grid11 = [
  ['O', 'T', 'T', 'T', 'O'],
  ['T', 'T', 'O', 'T', 'T'],
  ['O', 'O', 'O', 'O', 'O'],
  ['T', 'T', 'O', 'T', 'O'],
  ['T', 'T', 'O', 'T', 'T']
];
console.log(largestForestArea(grid11) === 7);

// All test cases should log true