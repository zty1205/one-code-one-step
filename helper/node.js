class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

function buildLinkNodeByArray(array) {
  if (!array || !Array.isArray(array)) return null;
  let header = { next: null };
  let p = header;
  for (let val of array) {
    p.next = new ListNode(val);
    p = p.next;
  }
  return header.next;
}

window.buildLinkNodeByArray = buildLinkNodeByArray;

function buildArrayByLinkNode(linkNode) {
  if (!linkNode) return null;
  const res = [];
  let node = linkNode;
  while (node) {
    res.push(node.val);
    node = node.next;
  }
  return res;
}

window.buildArrayByLinkNode = buildArrayByLinkNode;
