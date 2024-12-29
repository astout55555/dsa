// Create a function that calculates the sum of the first `n`
// natural numbers. A natural number is a positive integer
// starting from 1. Therefore, the sum of the first `n` natural
// numbers is the sum of all integers from 1 to `n`.

// For example, if `n` is 5, the sum would be 1 + 2 + 3 + 4 + 5 == 15.

function sumOfNaturalNumbers(num) {
  return sumOfNaturalNumbersHelper(num, 0)
}

function sumOfNaturalNumbersHelper(num, sum) {
  if (num <= 1) return num + sum;
  sum = sumOfNaturalNumbersHelper(num - 1, sum);
  return num + sum;
}

// LS solution: doesn't use helper function with sum because sum is 0 with base case,
// and `return n + func(n-1)` is the same as `return num + sum`
function sumOfNaturalNumbers(n) {
  if (n <= 1) {
    return n;
  }
  return n + sumOfNaturalNumbers(n - 1);
}

console.log(sumOfNaturalNumbers(1) === 1);
console.log(sumOfNaturalNumbers(5) === 15);
console.log(sumOfNaturalNumbers(10) === 55);
console.log(sumOfNaturalNumbers(20) === 210);
console.log(sumOfNaturalNumbers(0) === 0);

// All test cases should log true.
