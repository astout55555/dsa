// Given an array of numbers, return its majority element.

// The majority element is the value in the array that appears
// as at least half of the elements in the array.

// It is guaranteed that only one majority element exists in the array.

// my solution, which has O(N) time complexity
function findMajority(nums) {
  const counts = {};
  nums.forEach((number) => {
    if (counts[number]) {
      counts[number] += 1;
    } else {
      counts[number] = 1;
    }
  });
  const max = Math.max(...Object.values(counts));
  const majorityStringNum = Object.keys(counts).filter(key => counts[key] === max)[0];
  return Number(majorityStringNum);
}

// Test Cases:

console.log(findMajority([6, 4, 4, 6, 4]) === 4);
console.log(findMajority([4, 5, 2, 5, 5, 5, 1]) === 5);
console.log(findMajority([1, 2, 1, 2, 2, 1, 2]) === 2);
console.log(findMajority([1, 2, 3, 1, 4, 4, 1, 1]) === 1);
console.log(findMajority([5, 5, 5]) === 5);

// All test cases should log true

// LS solution, which also has O(N) time complexity but is somewhat more optimized

function findMajority(nums) {
  const counts = new Map();
  const majorityCount = Math.ceil(nums.length / 2);

  for (let num of nums) {
    if (counts.has(num)) {
      counts.set(num, counts.get(num) + 1);
    } else {
      counts.set(num, 1);
    }

    if (counts.get(num) >= majorityCount) {
      return num;
    }
  }
}