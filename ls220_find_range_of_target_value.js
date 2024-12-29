"use strict";

// You are given a sorted array of integers in ascending order.
// Your task is to find the starting and ending positions of
// a given target value within the array.

// Implement a function findRange that takes in an array of integers
// "nums" and a target value "target". The function should return an array
// containing the starting and ending positions of the target value
// within the array. If the target value is not found, return [-1, -1].

// Example:
// Input: nums = [1, 2, 3, 3, 3, 3, 3, 4, 5], target = 3
// Output: [2, 6]

// Example:
// Input: nums = [1, 2, 3, 3, 3, 5, 6,], target = 4
// Output: [-1, -1]

/*

Problem:
  input: an input array and a target value,
    which may or may not be found within it
  output:
    -[leftmostIndex, rightmostIndex]
      (index range of the target value in the input array)
    -or [-1, -1] if not found in the input array

Data:
  working with sorted arrays of integers, and integer target inputs

Algorithm:
  -must use binary search
  -use helper functions to find the left and right index values, then return

Finding leftmost index:
1. use binary search except:
  -currentLeftmost is assigned when target is found
  (if target not found, return -1)
2. Continue search on left side for lower index targets
  reassign currentleftmost to mid, and right to mid + 1
3. after loop finishes, return currentLeftmost if it's >= 0, else -1

Finding rightmost index:
1. same as above, except search on right side each time
  reassigning currentrightmost to mid, left to mid - 1

*/

function findRangeOfTargetValue(array, target) {
  let left = findLeftmostIndex(array, target);
  let right = findRightmostIndex(array, target);

  return [left, right];
}

// time complexity becomes O(N) for examples like [3, 3, 3, 3, 3], target 3
// is better in other situations, but worst case scenario is crucial.
// so we need a better solution, with O(logN) time complexity for each case.
// function findLeftmostIndex(array, target) {
//   let left = 0;
//   let right = array.length - 1;
//   while (left <= right) {
//     let mid = Math.floor((left + right) / 2)
//     if (array[mid] < target) {
//       left = mid + 1;
//     } else if (array[mid] > target) {
//       right = mid - 1;
//     } else {
//       while (array[mid] === target) {
//         mid -= 1; // += 1 for rightmost
//       }

//       return mid + 1; // - 1 for rightmost
//     }
//   }

//   return -1;
// }

/* eslint-disable */

function findLeftmostIndex(array, target) {
  let left = 0;
  let right = array.length - 1;
  let currentLeftmost;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (array[mid] === target) {
      currentLeftmost = mid;
      right = mid - 1;
    } else if (array[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  if (currentLeftmost >= 0) {
    return currentLeftmost;
  } else {
    return -1;
  }
}

function findRightmostIndex(array, target) {
  let left = 0;
  let right = array.length - 1;
  let currentRightmost;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (array[mid] === target) {
      currentRightmost = mid;
      left = mid + 1;
    } else if (array[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  if (currentRightmost >= 0) {
    return currentRightmost;
  } else {
    return -1;
  }
}

// Test cases:

let nums = [1, 2, 3, 3, 3, 3, 3, 4, 5];
let target = 3

console.log(findRangeOfTargetValue(nums, target));
// Output: [2, 6]


nums = [1, 2, 3, 3, 3, 5, 6,];
target = 4;

console.log(findRangeOfTargetValue(nums, target));
// Output: [-1, -1]


nums = [3, 3, 3, 3, 3, 3];
target = 3;

console.log(findRangeOfTargetValue(nums, target));
// Output: [0, 5]
