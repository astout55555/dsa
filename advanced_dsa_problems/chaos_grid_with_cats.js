// You are given a grid represented as a
// nested array filled with strings.

// Chaos is standing at the top-left corner of
// the grid and can move either down or right at
// any point in time. However, there are sleeping
// cats in certain squares, represented by the
// letter "C" in the grid, and Chaos cannot go through
// these squares.

// Determine the number of distinct paths Chaos
// can take to reach a bowl of treats placed at
// the bottom-right corner of the grid.

// Define a function `chaosInTheGridWithCats` that,
// given a nested array, returns the number of
// unique paths that Chaos can take to reach the
//  bottom-right corner.

// The grid will have at least 1 row and 1 column.

// Example:

// Given the following 2x3 grid:

const grid = [
  ["", "C", ""],
  ["", "", ""],
];

// There is only one distinct path Chaos can take:
// 1. Down -> Right -> Right

/* PEDAC

Problem:
-cannot move through square with 'C' (cat), but can still only move down or right
-total paths is therefore equal to sum of square above and to the left, except
  any cat squares would add 0 paths
-any unreachable square should have result of 0 -- need to detect unreachable
  -square is unreachable if both neighbors are cats or only neighbor is a cat

Edge case:
-if destination square is a cat, return 0 right away


Data:
  -use the input grid to reduce space complexity to O(1)
  -nested array with empty strings or 'C'

Algorithm:
  -determine rows/cols from input grid, then put indexes (- 1) into helper func
  -helper func uses recrusion, changes value of each square to total paths
  -refer to same inputgrid as the memo, since it remembers through mutations
  -if square is cat, mutate grid square to/return 0
  -rowIdx 0 or colIdx 0 squares then mutate/return 1 (unless they were cats)
  -can calculate sum as normal, because cats will be treated as another base case

*/

// my initial solution, which did not account for certain exceptions until I
// added additional complicated conditional checks afterwards...
function chaosInTheGridWithCats(grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  if (grid[0][0] === 'C') return 0;

  function getSolutionsForSquare(rowIdx, colIdx) {
    if (grid[rowIdx][colIdx] === 'C' ||
      // and somehow check for unreachable spots in first column and row...
      // which I think is doable but is a lot of code for this condition...
      // check for unreachable due to cat in row:
      (rowIdx === 0 && grid[rowIdx].slice(0, colIdx).find(sq => sq === 'C'))
      // solves all examples, but does not account for unreachable in column 0
      // also have to add check for unreachable position in col 0, even more code...
    ) {
      grid[rowIdx][colIdx] = 0;
      return 0;
    } else if (grid[rowIdx][colIdx] !== '') {
      return grid[rowIdx][colIdx];
    } else if (rowIdx === 0 || colIdx === 0) {
      grid[rowIdx][colIdx] = 1;
      return 1;
    }

    grid[rowIdx][colIdx] = getSolutionsForSquare(rowIdx - 1, colIdx) +
      getSolutionsForSquare(rowIdx, colIdx - 1);

    return grid[rowIdx][colIdx];
  }

  return getSolutionsForSquare(rows - 1, cols - 1);
}

// LS solution, which leverages a properly chosen base case and a separate map cache
function chaosInTheGridWithCats(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const cache = new Map();

  function helper(row, col) {
    if (row < 0 || col < 0 || grid[row][col] === "C") {
      return 0; // does not need to fill the cache for out of bounds positions
    }
    if (row === 0 && col === 0) {
      return 1; // this solution could reduce space complexity by mutating the grid
    }

    const key = `${row} ${col}`;

    if (cache.has(key)) {
      return cache.get(key);
    }

    const paths = helper(row - 1, col) + helper(row, col - 1);

    cache.set(key, paths);

    return paths;
  }

  return helper(rows - 1, cols - 1);
}

// alternate LS solution using a separate nested array instead of a map as the cache
function chaosInTheGridWithCats(grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  const cache = new Array(rows).fill().map(() => new Array(cols).fill(0));

  function helper(row, col) {
    if (row < 0 || col < 0 || grid[row][col] === "C") {
      return 0; // no need to memoize, solution is known to be 0 here
    } // base cases, out of bounds 0s help provide answers to in bounds squares
    if (row === 0 && col === 0) {
      return 1; // still no need to memoize with specific solution known
    } // final base case

    if (cache[row][col] !== 0) {
      return cache[row][col];
    } // memoize solution

    cache[row][col] = helper(row - 1, col) + helper(row, col - 1);

    return cache[row][col];
  }

  return helper(rows - 1, cols - 1);
}

// my solution may have lower space complexity (does not use a separate cache),
// but it is more complicated and would be hard to read without using more
// helper functions (final check not even added, needs its own helper function).
// my solution may also increase time complexity comparatively, since the complex
// checks require multiple scans of arrays (with conditionals within findIndex, e.g.)
// or else increase space complexity anyway (with call to slice, in e.g. solution).

// final LS solution, using bottom up algorithm instead:
function chaosInTheGridWithCats(grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  const dp = new Array(rows).fill().map(() => new Array(cols).fill(0));

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === "C") {
        dp[row][col] = 0;
      } else if (row === 0 && col === 0) {
        dp[row][col] = 1;
      } else {
        let fromTop = row > 0 ? dp[row - 1][col] : 0; // conditionals handle edges
        let fromLeft = col > 0 ? dp[row][col - 1] : 0;
        dp[row][col] = fromTop + fromLeft;
      }
    }
  }

  return dp[rows - 1][cols - 1];
} // this method could map existing grid from ''s to 0s, reducing space complexity

// Test Cases:

const grid1 = [
  ["", "C"],
  ["", ""],
];
const grid2 = [["", "C"]];
const grid3 = [
  ["", "", ""],
  ["", "C", ""],
  ["", "", ""],
];
const grid4 = [
  ["", "", "", "", "C"],
  ["", "C", "", "", ""],
  ["", "", "", "C", ""],
];
const grid5 = [
  ["", "", "", "", "C", ""],
  ["", "C", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "C", "", ""],
  ["", "C", "", "", "", ""],
  ["", "", "", "", "", ""],
];

console.log(chaosInTheGridWithCats(grid1) === 1);
console.log(chaosInTheGridWithCats(grid2) === 0);
console.log(chaosInTheGridWithCats(grid3) === 2);
console.log(chaosInTheGridWithCats(grid4) === 2);
console.log(chaosInTheGridWithCats(grid5) === 43);
