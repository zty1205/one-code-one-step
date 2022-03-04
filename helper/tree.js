class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }
}

const TREE_SPLIT = ',';
const TREE_EMPTY = 'NONE';

function _buildNodeMap(map = new Map(), node, config = {}) {
  if (!node || !config.nodeMap) return;
  map.set(node.val, node);
}

function buildTreeByArray(arr = [], config = {}) {
  let array = arr.map((x) => (x = x || TREE_EMPTY));
  const root = new TreeNode(+[array[0]]);

  const nodeMap = new Map();
  _buildNodeMap(nodeMap, root, config);

  let i = 1;
  let queue = [root];
  while (queue.length && i < array.length) {
    let node = queue.shift();
    if (array[i] !== TREE_EMPTY) {
      node.left = new TreeNode(+array[i]);
      queue.push(node.left);

      _buildNodeMap(nodeMap, node.left, config);
    }
    i++;
    if (array[i] !== TREE_EMPTY) {
      node.right = new TreeNode(+array[i]);
      queue.push(node.right);

      _buildNodeMap(nodeMap, node.right, config);
    }
    i++;
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
