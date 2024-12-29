// You are given a grid represented as a nested array filled
// with empty strings. Chaos, the puppy, is standing at the
// top-left corner of the grid and can move either down or right
// at any point in time. Determine the number of distinct paths
// Chaos can take to reach a bowl of treats placed at the
// bottom-right corner of the grid.

// Define a function `chaosInTheGrid` that, given a nested
// array, returns the number of unique paths that Chaos
// can take to reach the bottom-right corner.

// The grid will have at least 1 row and 1 column.

// Example:

// Given the following 2x3 grid:

const grid = [
  ["", "", ""],
  ["", "", ""],
];

// There are three distinct path Chaos can take:
// 1. Right -> Right -> Down
// 2. Right -> Down -> Right
// 3. Down -> Right -> Right

/* PEDAC

Problem:
-must solve top-down, i.e. starting from solution to the final square of grid
-each square's solution involves the combination (addition) of the solutions
  above 1 and to the left 1
-squares with a row or column index of 0 have a solution of 1 (base case)
-should solve with memoization, but can solve with brute force recursion first to help
-memoization means storing each solution for future use
-to include a memo, can wrap helper solution that solves subproblem in main func,
  and initialize the memo in the outer func (define helper within to use closure,
  then return helper func with initial N arg)

Data:
-can use array or hashmap (init hashmap with `new Map()`, use `has()` for checking)
-hashmap would allow for storing named keys like 'row1col2', but these wouldn't be
  easily accessible with data within recursion
-instead, use a dp nested array which stores the solutions to each square to match

Algorithm:
-declare memo grid full of nulls, mapped from inputGrid
-use helper func recursiveHelper(rowIdx, colIdx)
-check if memogrid[row][col] exists (should by default be undefined), and
  if so, return solution
-squares with a row or column index of 0 have/return a solution of 1 (base case)
-use recursiveHelper(starting with rows - 1, cols - 1) converting length to idx
-return recursiveHelper(rowIdx, colIdx) + recursiveHelper(rowIdx-1, colIdx-1)

*/

// // my top-down solution using recursion and a memo grid:
// function chaosInTheGrid(grid) {
//   const memoGrid = grid.map(row => row.map(() => null));
//   const rows = grid.length;
//   const cols = grid[0].length;
  
//   function getSolutionsForSquare(rowIdx, colIdx) {
//     const currentSquareSolution = memoGrid[rowIdx][colIdx];

//     if (currentSquareSolution) {
//       return currentSquareSolution;
//     } else if (rowIdx === 0 || colIdx === 0) {
//       memoGrid[rowIdx][colIdx] = 1;
//       return 1;
//     }

//     const solutions = getSolutionsForSquare(rowIdx - 1, colIdx) +
//       getSolutionsForSquare(rowIdx, colIdx - 1);
      
//     memoGrid[rowIdx][colIdx] = solutions;

//     return solutions;
//   }

//   return getSolutionsForSquare(rows - 1, cols - 1);
// }

// my solution using recursion and mutating inputgrid (to reduce space complexity):
function chaosInTheGrid(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  
  function getSolutionsForSquare(rowIdx, colIdx) {
    if (grid[rowIdx][colIdx] !== '') {
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


// // bottom up solution from LS:
// function chaosInTheGrid(grid) {
//   const rows = grid.length;
//   const cols = grid[0].length;

//   // Populate every square in the first row with 1s
//   for (let col = 0; col < cols; col++) {
//     grid[0][col] = 1;
//   }

//   // Populate every square in the first column with 1s
//     for (let row = 0; row < rows; row++) {
//     grid[row][0] = 1;
//   }

//   // Iterate over each square that isn't in the first row or column
//   for (let row = 1; row < rows; row++) {
//     for (let col = 1; col < cols; col++) {
//       // Populate the current square with the sum of the values
//       // in the squares above it and to the left of it
//       grid[row][col] = grid[row - 1][col] + grid[row][col - 1];
//     }
//   }

//   return grid[rows - 1][cols - 1];
// }

// Test cases

const grid1 = [[""]];
const grid2 = [
  ["", ""],
  ["", ""],
];
const grid3 = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
const grid4 = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];
const grid5 = [
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "", "", ""],
];
console.log(chaosInTheGrid(grid1) === 1);
console.log(chaosInTheGrid(grid2) === 2);
console.log(chaosInTheGrid(grid3) === 6);
console.log(chaosInTheGrid(grid4) === 15);
console.log(chaosInTheGrid(grid5) === 252);
// All test cases should log true