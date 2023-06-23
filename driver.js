const Tree = require('./binarySearchTree')

function createArray(size) {
  return [...new Array(size)].map(() => Math.floor(Math.random() * size))
}

function unBalance(size) {
  const rand = createArray(size)
  rand.forEach((elem) => tree.insert(elem))
}

function print() {
  console.log('Balanced:', tree.isBalanced())
  console.log('Lever Order:', tree.levelOrder())
  console.log('Preorder: ', tree.preorder())
  console.log('Inorder:', tree.inorder())
  console.log('Postorder:', tree.postorder())
}

const tree = new Tree(createArray(20))

let arr = tree.prettyPrint()
arr.forEach((e) => console.log(e))
print()
unBalance(10)
arr = tree.prettyPrint()
arr.forEach((e) => console.log(e))
console.log('Balanced:', tree.isBalanced())
tree.rebalance()
print()
