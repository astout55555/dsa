// Given an undirected graph represented by an edge list, determine if
// there is a path between specified source and destination vertices.

// Implement the function `hasPath` that takes three arguments:
// an edge list representing the graph, a source vertex, and a
// destination vertex. The function should return true if a path
// exists between the source and destination, and false otherwise.

/* PEDAC

Problem: get edgeList, src, destination, return boolean for whether a path exists

Data:
  -edge list provided, not an adjacency list, best to transform it first

Algorithm:
  -transform edge list to adjacency list
  -create visited set to prevent infinite loops
  -in helper func, traverse adjacency list use recursive dfs solution (most efficient)
    -add process for each node comparing to dst, return true if match found
    -REMEMBER that early returns only return from deepest function call,
      must check the result of each recursive call, and return true early if true
    -if full (reachable) list traversed without finding match, return false
  -invoke helper and return its result

*/

// helper function to transform edge list to adjacency list
function createAdjList(edgeList) {
  const adjList = new Map();

  edgeList.forEach(([vertex1, vertex2]) => {
    if (!adjList.has(vertex1)) adjList.set(vertex1, []);
    adjList.get(vertex1).push(vertex2);

    if (!adjList.has(vertex2)) adjList.set(vertex2, []);
    adjList.get(vertex2).push(vertex1);
  });
  return adjList;
}

function hasPath(edgeList, src, dst) {
  const adjList = createAdjList(edgeList);
  const visited = new Set([]); // must be an arr so immediately iterable

  function hasPathHelper(src) {
    if (src === dst) return true;
    visited.add(src);
  
    let neighbors = adjList.get(src);
    for (let neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        let pathFoundYet = hasPathHelper(neighbor);
        if (pathFoundYet) return true;
      }
    }

    return false;
  }

  return hasPathHelper(src);
}

console.log(hasPath([[1, 2], [2, 3], [3, 4]], 1, 4) === true);
console.log(hasPath([[1, 2], [3, 4]], 1, 4) === false);
console.log(hasPath([[1, 2], [1, 3], [2, 4], [3, 4], [3, 5], [5, 6]], 1, 6) === true);
console.log(hasPath([], 1, 1) === true);
console.log(hasPath([[1, 2], [1, 3], [4, 5], [6, 7]], 2, 5) === false);
console.log(hasPath([[1, 2], [2, 3], [3, 4], [4, 5], [1, 5], [2, 6], [6, 7], [7, 8], [8, 5]], 1, 8) === true);
console.log(hasPath([[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3], [2, 7], [7, 8], [8, 7], [7, 9], [9, 10], [10, 11], [11, 12], [12, 10], [7, 13]], 1, 13) === true);
console.log(hasPath([[1, 2], [2, 3], [3, 1], [4, 5], [5, 6], [6, 4], [7, 8], [8, 9], [9, 10], [10, 7], [11, 12], [13, 14], [14, 15], [15, 13]], 1, 12) === false);
// All test cases should log true