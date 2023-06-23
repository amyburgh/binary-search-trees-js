const Tree = require('./binarySearchTree')

function createArray(size) {
  return [...new Array(size)].map(() => Math.floor(Math.random() * 100))
}

function unBalance(size) {
  const rand = createArray(size)
  rand.forEach((elem) => tree.insert(elem))
}

function printTests() {
  // console.log('Balanced:', tree.isBalanced())
  console.log('Lever Order:', tree.levelOrder())
  console.log('Preorder:', tree.preorder())
  console.log('Inorder:', tree.inorder())
  console.log('Postorder:', tree.postorder())
}

function printTree() {
  let arr = tree.prettyPrint()
  arr.forEach((e) => console.log(e))
}

const tree = new Tree(createArray(10))

console.log(
  `\n========== ${tree.isBalanced() ? ' Balanced ' : 'unBalanced'} ==========\n`
)
printTree()
// printTests()

unBalance(5)
console.log(
  `\n========== ${tree.isBalanced() ? ' Balanced ' : 'unBalanced'} ==========\n`
)
printTree()

tree.rebalance()
console.log(
  `\n========== ${tree.isBalanced() ? ' Balanced ' : 'unBalanced'} ==========\n`
)
printTree()
// printTests()
