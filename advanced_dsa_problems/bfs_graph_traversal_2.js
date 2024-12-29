// Implement a function `bfs` that accepts two arguments: the adjacency list
// representing an undirected graph and a starting vertex (source).
// The function should print the vertices in breadth-first
// traversal order.

// bfs using a `visited` set
function bfs(adjList, source) {
  let queue = [source]; // renamed stack to queue
  let visited = new Set([source]);

  while (queue.length !== 0) {
    let current = queue.shift(); // just changed this to shift instead of pop
    console.log(current);

    let neighbors = adjList.get(current);
    for (let neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}

const adjList = new Map();
adjList.set(1, [2, 3]);
adjList.set(2, [1, 4]);
adjList.set(3, [1, 4, 5]);
adjList.set(4, [2, 3]);
adjList.set(5, [3, 6]);
adjList.set(6, [5]);

console.log(bfs(adjList, 1)); // 1, 2, 3, 4, 5, 6 or 1, 3, 2, 5, 4, 6
// prints undefined because the outer console.log is unnecessary to print