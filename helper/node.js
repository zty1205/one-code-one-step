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
