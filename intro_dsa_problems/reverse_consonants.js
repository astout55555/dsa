// Given a string `str`, reverse all the consonants in the string and return it.
// Consonants are all alphabetic characters except for the vowels `'a'`, `'e'`, `'i'`,
// `'o'`, and `'u'`, which can appear in both lower and upper cases.
// The consonants can appear more than once in the string.

const VOWELS = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];

function reverseConsonants(string) {
  let startIdx = 0;
  let endIdx = string.length - 1;
  let arr = string.split('');
  while (startIdx < endIdx) {
    if (!VOWELS.includes(arr[startIdx]) && !VOWELS.includes(arr[endIdx])) {
      [arr[startIdx], arr[endIdx]] = [arr[endIdx], arr[startIdx]];
      startIdx += 1;
      endIdx -= 1;
    }
    
    if (VOWELS.includes(arr[startIdx])) {
      startIdx += 1;
    }

    if (VOWELS.includes(arr[endIdx])) {
      endIdx -= 1;
    }
  }

  return arr.join('');
}

console.log(reverseConsonants("") === "");
console.log(reverseConsonants("s") === "s");
console.log(reverseConsonants("HELLO") === "LELHO");
console.log(reverseConsonants("leetcode") === "deectole");
console.log(reverseConsonants("example") === "elapmxe");
console.log(reverseConsonants("Consonants") === "sotnonasnC");

// All test cases should log true