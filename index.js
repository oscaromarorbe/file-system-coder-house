const { ProductManager } = require('./product-manager.js')
const productManager = new ProductManager()

const persist = async () => {
  await productManager.addProduct('soap', 'hand soap', 5, 'image', 'soap', 2)
  await productManager.addProduct('toothbrush', 'blue toothbrush', 7, 'image', 'toothbrush', 4)
  console.log(await productManager.getProductById(1))
  await productManager.updateProduct(0, {description: 'yellow soap'})
  await productManager.deleteProduct(1)
  console.log(await productManager.getProducts())
}

persist()
