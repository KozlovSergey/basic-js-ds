const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    const newNode = new Node(data);

    if (!this._root) {
      this._root = newNode;
      return;
    }

    let node = this._root;

    while (node) {
      if (node.data > newNode.data) {
        if (!node.left) {
          node.left = newNode;
          return;
        }

        node = node.left;
      } else {
        if (!node.right) {
          node.right = newNode;
          return;
        }

        node = node.right;
      }
    }
  }

  has(data) {
    let node = this._root;

    while (node !== null) {
      if (node.data === data) return true;
      node = node.data > data ? node.left : node.right;
    }

    return false;
  }

  find(data) {
    let node = this._root;

    while (node !== null) {
      if (node.data === data) return node;
      if (node.data > data) node = node.left;
      if (node.data < data) node = node.right;
    }

    return null;
  }

  remove(data) {
    this._root = this._removeNode(data, this._root);
  }

  _removeNode(data, node) {
    if (node) {
      if (node.data > data) {
        node.left = this._removeNode(data, node.left);
      } else if (node.data < data) {
        node.right = this._removeNode(data, node.right);
      } else if (node.left && node.right) {
        // Replace node having 2 child
        node.data = this.min(node.right); // Find min node in right sub-tree
        node.right = this._removeNode(node.data, node.right); // Remove min node from the right sub-tree
      } else {
        // Move single child up OR set null if it is a leaf node
        node = node.right || node.left;
      }
    }

    return node;
  }

  min(searchNode = this._root) {
    if (!searchNode) return null;

    let node = searchNode;
    while (node.left !== null) node = node.left;
    return node.data;
  }

  max() {
    if (!this._root) return null;

    let node = this._root;
    while (node.right !== null) node = node.right;
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};