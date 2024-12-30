// Create a function `combinations` that takes an array of integers and an
// integer, k, and returns all possible combinations of k numbers chosen
// from the array. The input array will contain at most 20 numbers.

// Example:
// Input: nums = [1,2,3,4], k = 2
// Output: [
//   [1,2], [1,3], [1,4], [2,3], [2,4], [3,4]
// ]

// my solution
function combinations(nums, k) {

  function isUnique(candidate) {
    const seen = new Set();
    for (let entry of candidate) {
      if (seen.has(entry)) {
        return false;
      }
      seen.add(entry);
    }
    return true;
  }

  function backtrack(nums, candidate, result) {
    if (candidate.length === k && isUnique(candidate)) { // success condition
      result.push([...candidate]);
      return;
    }

    for (let elem of nums) { // assuming the input array is sorted
      if (elem <= candidate[candidate.length - 1]) {  // dead-end condition
        continue; // skips dead-ends, but still checks each num first
      }

      candidate.push(elem);  // take
      backtrack(nums, candidate, result);  // explore
      candidate.pop();  // clean up
    }
  }

  const result = [];
  const candidate = [];
  backtrack(nums, candidate, result);
  return result;
}

// LS solution using a pointer to consider shrinking portion of nums arr
function combinations(candidates, k) {
  function backtrack(candidates, candidate, result, position) {
    if (candidate.length === k) {
      result.push([...candidate]);
      return;
    }
    for (let idx = position; idx < candidates.length; idx++) {
      const elem = candidates[idx];
      candidate.push(elem);
      backtrack(candidates, candidate, result, idx + 1);
      candidate.pop();
    }
  }

  const result = [];
  const candidate = [];
  let position = 0;
  backtrack(candidates, candidate, result, position);
  return result;
}

function testCombinations(nums, k, expectedLength) {
  const result = combinations(nums, k);
  if (result.length !== expectedLength) return false;

  const stringifiedCombs = result.map(JSON.stringify);
  const uniqueCombs = new Set(stringifiedCombs);
  return uniqueCombs.size === expectedLength;
}

// Test Cases:
console.log(testCombinations([1,2,3,4], 2, 6)); // C(4,2) = 6
console.log(testCombinations([1,2,3,4,5], 3, 10)); // C(5,3) = 10
console.log(testCombinations([1,2,3,4,5,6], 4, 15)); // C(6,4) = 15
console.log(testCombinations([1,2,3,4,5,6,7], 3, 35)); // C(7,3) = 35
console.log(testCombinations([1,2,3,4,5,6,7,8], 5, 56)); // C(8,5) = 56
console.log(testCombinations([...Array(10).keys()].map(x => x + 1), 6, 210)); // C(10,6) = 210
console.log(testCombinations([...Array(20).keys()].map(x => x + 1), 10, 184756)); // C(20,10) = 184,756