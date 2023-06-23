class TreeNode {
  constructor(data) {
    this.data = data
    this.left = null
    this.right = null
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr)
  }

  build(arr) {
    if (!arr.length) return null
    let mid = parseInt((arr.length - 1) / 2)
    const node = new TreeNode(arr[mid])
    node.left = this.build(arr.slice(0, mid))
    node.right = this.build(arr.slice(mid + 1))
    return node
  }

  buildTree(arr) {
    const cleanArray = [...new Set(arr)].sort((a, b) => a - b)
    return this.build(cleanArray)
  }

  insert(data, node = this.root) {
    if (!node) return new TreeNode(data)

    if (data < node.data) node.left = this.insert(data, node.left)
    else if (data > node.data) node.right = this.insert(data, node.right)
    return node
  }

  delete(data, node = this.root) {
    if (!node) return node

    if (data < node.data) {
      node.left = this.delete(data, node.left)
    } else if (data > node.data) {
      node.right = this.delete(data, node.right)
    }
    if (data !== node.data) return node

    // node -> NO child nodes
    if (!node.left && !node.right) {
      return null
    }

    // node -> only ONE child node
    else if (!node.left || !node.right) {
      let tmp = !node.left ? node.right : node.left
      node = null
      return tmp
    }

    // node -> BOTH child nodes
    let parent = node
    let child = node.right
    while (child.left) {
      parent = child
      child = child.left
    }
    if (parent !== node) parent.left = child.right
    else parent.right = child.right
    node.data = child.data
    child = null
    return node
  }

  find(data, node = this.root) {
    if (!node) return node

    if (data === node.data) return node
    else if (data < node.data) return this.find(data, node.left)
    else return this.find(data, node.right)
  }

  levelOrder(func = null, node = this.root) {
    const queue = []
    const arr = []
    if (node) queue.push(node)

    while (queue.length) {
      let tmp = queue.shift()
      func ? func(tmp) : arr.push(tmp.data)
      if (tmp.left) queue.push(tmp.left)
      if (tmp.right) queue.push(tmp.right)
    }
    return func ? null : arr
  }

  /*
   * ======================== Traversals ========================
   * Inorder:   left subtree   -> root          -> right subtree
   * Preorder:  root           -> left subtree  -> right subtree
   * Postorder: left subtree   -> right subtree -> root
   * ============================================================
   */

  inorder(func, node = this.root, arr = []) {
    if (!node) return

    this.inorder(func, node.left, arr)
    func ? func(node) : arr.push(node.data)
    this.inorder(func, node.right, arr)

    return func ? null : arr
  }

  preorder(func, node = this.root, arr = []) {
    if (!node) return

    func ? func(node) : arr.push(node.data)
    this.preorder(func, node.left, arr)
    this.preorder(func, node.right, arr)

    return func ? null : arr
  }

  postorder(func, node = this.root, arr = []) {
    if (!node) return

    this.postorder(func, node.left, arr)
    this.postorder(func, node.right, arr)
    func ? func(node) : arr.push(node.data)

    return func ? null : arr
  }

  /*
   * ============================================================
   * Height: number of connections from leaf/target node to root
   * Depth: number of connections  from root to leaf/target
   * ============================================================
   */

  height(node = this.root) {
    if (!node) return 0
    if (!node.left && !node.right) return 0

    const left = this.height(node.left)
    const right = this.height(node.right)
    return Math.max(left, right) + 1
  }

  depth(node = this.root, tmp = this.root) {
    if (!node || !tmp) return 0
    if (node.data === tmp.data) return 0

    const left = this.depth(node, tmp.left)
    const right = this.depth(node, tmp.right)
    return Math.min(left, right) + 1
  }

  isBalanced(node = this.root) {
    if (!node) return true
    const left = this.height(node.left)
    const right = this.height(node.right)

    return (
      Math.abs(left - right) <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    )
  }

  rebalance() {
    const arr = this.inorder()
    this.root = this.buildTree(arr)
  }

  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (!node) return
    if (node.right) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false)
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`)
    if (node.left) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true)
    }
  }
}
