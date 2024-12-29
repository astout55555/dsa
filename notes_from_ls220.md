# Sorting Methods

## Bubble Sort

```javascript
function bubbleSort(arr) {
  const len = arr.length;

  for (let i = 0; i < len - 1; i++) {
     // Flag to track if any swaps were made
    let swapped = false;

    // Last i elements are already in place
    for (let j = 0; j < len - 1 - i; j++) {

      // Check if the element in the current iteration
      // is greater than the one in the next iteration
      if (arr[j] > arr[j + 1]) {

        // Swapping elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true
      }
    }

    if (!swapped) {
      // If no swaps were made in this iteration, the array is already sorted
      break;
    }
  }

  return arr;
}

const array = [5, 3, 8, 7, 2];
console.log(bubbleSort(array)); // Output: [2, 3, 5, 7, 8]
```

## Selection Sort

```javascript
function selectionSort(arr) {
  const len = arr.length;

  for (let i = 0; i < len - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }

  return arr;
}

const array = [3, 8, 2, 1];
console.log(selectionSort(array)); // Output: [1, 2, 3, 8]
```

## Insertion Sort

```javascript
function insertionSort(arr) {
  const len = arr.length;

  for (let i = 1; i < len; i++) {
    let current = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = current;
  }

  return arr;
}

const array = [4, 2, 1, 3];
console.log(insertionSort(array)); // Output: [1, 2, 3, 4]
```

# Binary Search

## Template

With slight modifications for syntax/style:

```javascript
let left = 0;
let right = array.length - 1;
while (left <= right) {
  let mid = Math.floor((left + right) / 2);
  if (array[mid] === target) {
    // optional early return, e.g. `return mid`
  } else if (/*comparison*/) {
    left = mid + 1;
  } else {
    right = mid - 1;
  }
}

// Most often, if the target is not found, additional handling
// or returning a specific value is needed. In most cases it will
// be the value that `left` variable holds.
```

## Finding Insertion Position - Problem Solved

// Write a function named findInsertPosition that takes in a
// sorted array of distinct integers and a target value as input.
// The function should return the index where the target value is
// found in the array, or the index where it would be inserted if
// it were not found.

// If the target value is found in the array, the function should
// return the index of the target value. If the target value is not found,
// the function should return the index where it would be inserted
// while maintaining the sorted order of the array.

```javascript
function findInsertPosition(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] == target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return left;
}

console.log(findInsertPosition([3, 5, 7, 9, 11], 9)); // 3
console.log(findInsertPosition([3, 5, 7, 9, 11], 2)); // 0
console.log(findInsertPosition([3, 5, 7, 9, 11], 12)); // 5
```

# Linked Lists

## Demonstration

```javascript
class Node {
  constructor(data, next) {
    this.val = data === undefined ? 0 : data;
    this.next = next === undefined ? null : next;
  }
}

// original function, without a dummy node:
function deleteFromLinkedList(head, target) {
  let prev = null;
  let curr = head;

  if (!head) {
    return head;
  }

  while (curr) {
    if (curr.val === target) {
      if (!prev) {
        head = curr.next;
      } else {
        prev.next = curr.next;
      }
    } else {
      prev = curr;
    }
    curr = curr.next;
  }

  return head;
}

// new function, handles edge cases with dummy node:
function removeElements(head, target) {
  let dummy = new Node();
  dummy.next = head;
  let prev = dummy;
  let curr = head;

  while (curr) {
    if (curr.val === target) {
      prev.next = curr.next;
    } else {
      prev = curr;
    }
    curr = curr.next;
  }

  return dummy.next;
}

// Helper function to print the linked list
function printList(head) {
  let curr = head;
  let result = "";
  while (curr !== null) {
    result += curr.val + " -> ";
    curr = curr.next;
  }
  result += "null";
  return result;
}

// Test case 1
const head1 = new Node(1);
head1.next = new Node(2);
head1.next.next = new Node(3);
head1.next.next.next = new Node(2);
head1.next.next.next.next = new Node(4);

console.log("Input: 1 -> 2 -> 3 -> 2 -> 4 -> null");
console.log("Target: 2");
console.log("Output:", printList(deleteFromLinkedList(head1, 2)));
// Output: 1 -> 3 -> 4 -> null

// Test case 2
const head2 = new Node(1);
head2.next = new Node(3);
head2.next.next = new Node(1);

console.log("Input: 1 -> 3 -> 1");
console.log("Target: 1");
console.log("Output:", printList(deleteFromLinkedList(head2, 1)));
// Output: 3 -> null
```