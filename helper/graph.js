function Node(val, neighbors) {
  this.val = val === undefined ? 0 : val;
  this.neighbors = neighbors === undefined ? [] : neighbors;
}

function buildUndirectedGraphByArray(arr = []) {
  if (!arr || !arr.length) return null;

  let map = {};

  function getNode(val) {
    if (!(val in map)) {
      let n = new Node(val);
      map[val] = n;
    }
    return map[val];
  }

  let head = null;
  for (let i = 0; i < arr.length; i++) {
    let node = getNode(i + 1);
    node.neighbors = arr[i].map((x) => getNode(x));
    i === 0 && (head = node);
  }
  return {
    graph: head,
    map
  };
}

function buildArrayByUndirectedGraph(node) {
  if (!node) return [];

  let map = new WeakMap();

  const ans = [];

  function build(node) {
    debugger;
    if (!node) return;
    if (map.has(node)) return map.get(node);

    let neighbors = node.neighbors.map((n) => n.val);
    map.set(node, neighbors);
    ans[node.val - 1] = neighbors;

    for (let ne of node.neighbors) {
      build(ne);
    }
  }
  build(node);
  return ans;
}
