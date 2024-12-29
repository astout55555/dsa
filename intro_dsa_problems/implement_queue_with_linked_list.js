class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.back = null;
  }
  peek() {
    // Returns the value of the top most element without removing it.
    return this.front ? this.front.val : null;
    // If the queue is empty, it returns `null`.
  }

  enqueue(value) {
    // Adds an item to the queue
    const newQueuer = new ListNode(value);
    if (!this.front) {
      this.front = newQueuer;
      this.back = newQueuer;
    } else {
      this.back.next = newQueuer;
      this.back = newQueuer;
    }
  }

  // // my implementation
  // dequeue() {
  //   // Removes the item from the queue and returns it
  //   const dequeued = this.front;
  //   if (this.front.next === this.back) {
  //     this.front = this.back;
  //     this.back = null;
  //   } else if (dequeued) {
  //     this.front = this.front.next;
  //   }
  //   return dequeued;
  //   // If the queue is empty, it returns `null`.

  // alternate solution from LS:
  dequeue() {
    if (!this.front) return null;

    const removedNode = this.front;
    this.front = this.front.next;
    if (!this.front) {
      this.back = null;
    }
    return removedNode.val;
  }
}

const myQueue = new Queue();
myQueue.enqueue(1);
console.log('Front element:', myQueue.peek());  // logs 'Front element: 1'
myQueue.enqueue(2);
console.log('Front element:', myQueue.peek());  // logs 'Front element: 1'
myQueue.enqueue(3);
console.log('Front element:', myQueue.peek());  // logs 'Front element: 1'
myQueue.dequeue();
console.log('Front element after dequeue:', myQueue.peek());  // logs 'Front element after dequeue: 2'
myQueue.dequeue();
console.log('Front element after dequeue:', myQueue.peek());  // logs 'Front element after dequeue: 3'
myQueue.dequeue();
console.log('Peek on empty queue:', myQueue.peek());  // logs 'Peek on empty queue: null'
console.log('`back` on empty queue:', myQueue.back);  // logs '`back` on empty queue: null'
