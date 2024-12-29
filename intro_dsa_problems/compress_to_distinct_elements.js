// Given a sorted array of integers, your task is to implement a function
// `compressToDistinct` that modifies the array in-place to ensure
// it starts with a sequence of distinct elements in their original order.
// After making these modifications, the function should return
// the count of these distinct elements.

// The elements in the latter part of the array, after the distinct ones, are not important.

// Example:

// If the input array is [3, 3, 5, 7, 7, 8], there are four distinct elements: 3, 5, 7, and 8.
// After modifying the array to place these distinct elements at the beginning,
// the resulting array should look like this -> [3, 5, 7, 8, _, _].
// The underscores (_) represent the elements that are no longer important.

// You should name the function `compressToDistinct` for the tests to work correctly.

// my solution solves the problem while preserving the order of the nondistinct nums
function compressToDistinct(array) {
  let anchor = 0;
  let runner = 1;
  let indexCounter = 1;
  let toCheckDistinct;
  while (indexCounter < array.length) {
    toCheckDistinct = array[anchor];
    if (toCheckDistinct === array[runner]) {
      let removed = array.splice(runner, 1);
      array.push(removed[0]);
    } else {
      runner += 1;
      if (toCheckDistinct !== array[runner]) {
        anchor += 1;
      }
    }

    indexCounter += 1;
  }

  return anchor + 1;
}

function testCompressToDistinct(array, expectedLength) {
  const originalReference = array;
  const resultLength = compressToDistinct(array);
  const isSameObject = originalReference === array;
  const isLengthCorrect = resultLength === expectedLength;
  const isModifiedCorrectly = array.slice(0, expectedLength).every((val, idx, arr) => idx === 0 || val > arr[idx - 1]);

  return isSameObject && isLengthCorrect && isModifiedCorrectly;
}

console.log(testCompressToDistinct([3, 3, 5, 7, 7, 8], 4));
console.log(testCompressToDistinct([1, 1, 2, 2, 2, 3, 4, 4, 5], 5));
console.log(testCompressToDistinct([0], 1));
console.log(testCompressToDistinct([-5, -3, -3, -1, 0, 0, 0, 1], 5));
console.log(testCompressToDistinct([6, 6, 6, 6, 6, 6, 6], 1));

// All tests should log true.

// LS solution is shorter, doesn't preserve non-distinct numbers
function compressToDistinct(nums) {
  if (nums.length <= 1) return nums.length;

  let anchor = 0;

  for (let runner = 1; runner < nums.length; runner++) {
    if (nums[runner] !== nums[anchor]) {
      anchor++;
      nums[anchor] = nums[runner];
    }
  }

  return anchor + 1;
}
