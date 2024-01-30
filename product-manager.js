class ProductManager {
  #nextId
  #products
  #productDirPath
  #productsFilePath
  #fileSystem

  constructor () {
    ;(this.#products = []),
      (this.#nextId = 0),
      (this.#productDirPath = './files'),
      (this.#productsFilePath = this.#productDirPath + '/Products.json'),
      (this.#fileSystem = require('fs'))
  }

  async addProduct (title, description, price, thumbnail, code, stock) {
    const args = [title, description, price, thumbnail, code, stock]
    for (let i = 0; i < args.length - 1; i++) {
      if (args[i] === null || args[i] === undefined) {
        return console.log(
          'One or more arguments are not defined, \nPlease add missing arguments to the call \ntitle, description, price, thumbnail, code, stock'
        )
      }
    }
    if (typeof price !== 'number')
      return console.log('price argument must be a number')
    if (typeof stock !== 'number')
      return console.log('stock argument must be a number')
    const product = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id: this.#nextId
    }
    
    try {
      await this.#fileSystem.promises.mkdir(this.#productDirPath, {
        recursive: true
      })
      if (!this.#fileSystem.existsSync(this.#productsFilePath)) {
        await this.#fileSystem.promises.writeFile(this.#productsFilePath, '[]')
      }
      if (this.#products.find(item => item.code === code)) {
        return console.log('Item already exists, enter a different code')
      }
      let productsFile = await this.#fileSystem.promises.readFile(
        this.#productsFilePath,
        'utf-8'
      )
      this.#products = JSON.parse(productsFile)
      this.#products.push(product)
      this.#nextId++
      await this.#fileSystem.promises.writeFile(
        this.#productsFilePath,
        JSON.stringify(this.#products, null, 2, '\t')
      )
    } catch (err) {
      throw Error(err)
    }

    return product
  }

  async getProducts () {
    try {
      await this.#fileSystem.promises.mkdir(this.#productDirPath, {
        recursive: true
      })
      if (!this.#fileSystem.existsSync(this.#productsFilePath)) {
        await this.#fileSystem.promises.writeFile(this.#productsFilePath, '[]')
      }
      let productsFile = await this.#fileSystem.promises.readFile(
        this.#productsFilePath,
        'utf-8'
      )
      this.#products = JSON.parse(productsFile)
    } catch (err) {
      throw Error(err)
    }
    return console.log(this.#products)
  }

  async getProductById (id) {
    let found
    try {
      await this.#fileSystem.promises.mkdir(this.#productDirPath, {
        recursive: true
      })
      if (!this.#fileSystem.existsSync(this.#productsFilePath)) {
        await this.#fileSystem.promises.writeFile(this.#productsFilePath, '[]')
      }
      let productsFile = await this.#fileSystem.promises.readFile(
        this.#productsFilePath,
        'utf-8'
      )
      this.#products = JSON.parse(productsFile)
      found = this.#products.find(item => item.id === id)
    } catch (err) {
      throw Error(err)
    }
    return found ? console.log(found) : 'Not found'
  }

  async updateProduct (id, updatedProduct = {}) {
    try {
      await this.#fileSystem.promises.mkdir(this.#productDirPath, {
        recursive: true
      })
      if (!this.#fileSystem.existsSync(this.#productsFilePath)) {
        await this.#fileSystem.promises.writeFile(this.#productsFilePath, '[]')
      }
      let productsFile = await this.#fileSystem.promises.readFile(
        this.#productsFilePath,
        'utf-8'
      )
      this.#products = JSON.parse(productsFile)
      const arr = this.#products
      const indexFound = arr.map(product => product.id).indexOf(id)
      this.#products[indexFound] = {...this.#products[indexFound], ...updatedProduct}
      await this.#fileSystem.promises.writeFile(
        this.#productsFilePath,
        JSON.stringify(this.#products)
      )
    } catch (err) {
      throw Error(err)
    }
    return this.#products
  }

  async deleteProduct (id) {
    try {
      await this.#fileSystem.promises.mkdir(this.#productDirPath, {
        recursive: true
      })
      if (!this.#fileSystem.existsSync(this.#productsFilePath)) {
        await this.#fileSystem.promises.writeFile(this.#productsFilePath, '[]')
      }
      let productsFile = await this.#fileSystem.promises.readFile(
        this.#productsFilePath,
        'utf-8'
      )
      this.#products = JSON.parse(productsFile)
      const arr = this.#products
      const indexFound = arr.map(product => product.id).indexOf(id)
      this.#products = [...this.#products.slice(0, indexFound), ...this.#products.slice(indexFound + 1, this.#products.length)]
      await this.#fileSystem.promises.writeFile(
        this.#productsFilePath,
        JSON.stringify(this.#products)
      )
    } catch (err) {
      throw Error(err)
    }
    return this.#products
  }
}

module.exports = { ProductManager }
