// Implement a function `bfs` that accepts two arguments: the adjacency list
// representing an acyclic graph and a starting vertex (source).
// The function should print the vertices in breadth-first
// traversal order.

// my solution, which should use a queue for breadth-first (instead of a stack)
function bfs(adjList, source) {
  let queue = [source];
  while (queue.length !== 0) {
    let current = queue.shift(); // just changed this from pop() to shift()!
    console.log(current);
    let neighbors = adjList.get(current);
    for (let neighbor of neighbors) {
      queue.push(neighbor);
    }
  }
}

const adjList = new Map();
adjList.set(1, []);
adjList.set(2, [1, 3, 4]);
adjList.set(3, [5]);
adjList.set(4, [6]);
adjList.set(5, []);
adjList.set(6, []);
adjList.set(7, [6]);

bfs(adjList, 2); // 2, 1, 3, 4, 5, 6  or 2, 4, 3, 1, 6, 5

// Again, the order depends on which neighbor node we explore first