// Implement a function `dfs` that accepts two arguments: an adjacency
// list representing an undirected graph, and a starting vertex (source).
// The function should print the vertices in preorder depth-first
// traversal order.

// LS example solution using recursion:
// function dfs(adjList, source, visited = new Set()) {
//   console.log(source);
//   visited.add(source);

//   let neighbors = adjList.get(source);
//   for (let neighbor of neighbors) {
//     if (!visited.has(neighbor)) {
//       dfs(adjList, neighbor, visited);
//     }
//   }
// }

// my solution using a stack data structure and a `visited` set
function dfs(adjList, source) {
  const visited = new Set();
  const stack = [source];

  while (stack.length > 0) {
    let current = stack.pop(); // I visit repeat neighbors, but remove them without
    if (!visited.has(current)) { // processing or adding their neighbors again
      console.log(current);
      visited.add(current);
    
      if (!adjList.has(current)) {
        adjList.set(current) = [];
      }
  
      let neighbors = adjList.get(current);
      neighbors.forEach(neighbor => {
        stack.push(neighbor);
      });
    }
  }
}

// LS solution with stack and visited set, more concise
function dfs(adjList, source) {
  let stack = [source];
  let visited = new Set([source]);

  while (stack.length !== 0) {
    let current = stack.pop();
    console.log(current);

    let neighbors = adjList.get(current);
    for (let neighbor of neighbors) {
      if (!visited.has(neighbor)) { // skip neighbor here if already visited,
        visited.add(neighbor); // more efficient
        stack.push(neighbor);
      }
    }
  }
}

const adjList = new Map();
adjList.set(1, [2]);
adjList.set(2, [1, 3]);
adjList.set(3, [2]);

dfs(adjList, 1); // 1, 2, 3