class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }
}

function buildTreeByArray(array) {
  if (!array || !Array.isArray(array)) return null;
  array.reverse();
  const root = new TreeNode(array.pop());
  const stack = [root];
  while (array.length) {
    let node = stack.shift();
    let leftVal = array.pop();
    let rightVal = array.pop();
    if (node != null) {
      let left = leftVal != null ? new TreeNode(leftVal) : null;
      let right = rightVal != null ? new TreeNode(rightVal) : null;
      node.left = left;
      node.right = right;
      stack.push(left);
      stack.push(right);
    }
  }
  return root;
}
