class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }
}

function _buildNodeMap(map = new Map(), node, config = {}) {
  if (!node || !config.nodeMap) return;
  map.set(node.val, node);
}

function buildTreeByArray(array, config = {}) {
  if (!array || !Array.isArray(array)) return null;

  const nodeMap = new Map();

  array.reverse();
  const root = new TreeNode(array.pop());

  _buildNodeMap(nodeMap, root, config);

  const stack = [root];
  while (array.length) {
    let node = stack.shift();
    let leftVal = array.pop();
    let rightVal = array.pop();
    if (node != null) {
      let left = leftVal != null ? new TreeNode(leftVal) : null;
      let right = rightVal != null ? new TreeNode(rightVal) : null;

      _buildNodeMap(nodeMap, left, config);
      _buildNodeMap(nodeMap, right, config);

      node.left = left;
      node.right = right;
      stack.push(left);
      stack.push(right);
    } else {
      stack.shift();
      stack.push(null);
      stack.push(null);
    }
  }
  return config.nodeMap ? { root, nodeMap } : root;
}

function buildArrayByTree(root) {
  const res = [];
  const stack = [root];
  while (stack.length) {
    let node = stack.shift();
    if (!node) {
      res.push(null);
    } else {
      res.push(node.val);
      stack.push(node && node.left);
      stack.push(node && node.right);
    }
  }
  return res;
}
