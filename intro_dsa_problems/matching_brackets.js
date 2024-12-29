// Write a function `areMatched` that takes a string as an argument
// and returns true if all types of brackets (parentheses (),
// square brackets [], and curly braces {}) in the string are
// properly matched. For the brackets to be considered
// matched, every opening bracket must have a corresponding
// closing bracket of the same type, and the brackets must be
// correctly nested.

/*

solves problem of equal amounts and not closing before opening:
-need to track count of each type of open bracket, +1 for left, -1 for right;
-if any category goes negative, return false
-end by returning false if any of them aren't 0

other problem: cannot close other type before closing last opened type
-works like a stack, last in, first out
-build and manage a stack--add char type to stack, remove when closed
-if does not match top type, return false

*/

function areMatched(brackets) {
  let parenthesesOpen = 0;
  let squaresOpen = 0;
  let curliesOpen = 0;
  let bracketsStack = [];
  let lastClosed;

  for (let idx = 0; idx < brackets.length; idx++) {
    let char = brackets[idx];

    switch (char) {
      case '(':
        parenthesesOpen += 1;
        bracketsStack.push('parentheses');
        break;
      case ')':
        parenthesesOpen -= 1;
        if (parenthesesOpen < 0) return false;
        lastClosed = bracketsStack.pop();
        if (lastClosed !== 'parentheses') return false;
        break;
      case '[':
        squaresOpen += 1;
        bracketsStack.push('squares');
        break;
      case ']':
        squaresOpen -= 1;
        if (squaresOpen < 0) return false;
        lastClosed = bracketsStack.pop();
        if (lastClosed !== 'squares') return false;
        break;
      case '{':
        curliesOpen += 1;
        bracketsStack.push('curlies');
        break;
      case '}':
        curliesOpen -= 1;
        if (curliesOpen < 0) return false;
        lastClosed = bracketsStack.pop();
        if (lastClosed !== 'curlies') return false;
        break;
    }
  }

  return (parenthesesOpen + squaresOpen + curliesOpen === 0);
}

// LS solution is much tighter with condensing similar outcomes into groups
// also makes use of a hash to quickly check for the proper pair without hardcoding
function areMatched(string) {
  const stack = [];
  const matches = {
    '(': ')',
    '[': ']',
    '{': '}',
  };

  for (let char of string) {
    if (['(', '[', '{'].includes(char)) {
      stack.push(char);
    } else if ([')', ']', '}'].includes(char)) {
      if (stack.length === 0 || matches[stack.pop()] !== char) {
        return false;
      }
    }
  }
  return stack.length === 0;
}

console.log(areMatched("()"));              // Output: true
console.log(areMatched("([()]{})"));        // Output: true
console.log(areMatched("([((}]({}))"));     // Output: false
console.log(areMatched("{{[[(())]]}}"));    // Output: true
console.log(areMatched(""));                // Output: true
console.log(areMatched("([)]"));            // Output: false
