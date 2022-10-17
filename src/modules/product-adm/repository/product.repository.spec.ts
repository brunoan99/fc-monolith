import { Sequelize } from 'sequelize-typescript'
import { Product } from '../domain/entity/product.entity'
import { ProductModel } from './product.model'
import { ProductRepository } from './product.repository'

describe('Product Repository', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterAll(async () => {
    await sequelize.close()
  })

  test('Should add a product', async () => {
    const sut = new ProductRepository()
    const product = new Product({
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 100,
      stock: 10
    })
    await sut.add(product)
    const productFoundOnDb = await ProductModel.findByPk(product.id.id)
    expect(productFoundOnDb.id).toBe(product.id.id)
    expect(productFoundOnDb.name).toBe(product.name)
    expect(productFoundOnDb.description).toBe(product.description)
    expect(productFoundOnDb.purchasePrice).toBe(product.purchasePrice)
    expect(productFoundOnDb.stock).toBe(product.stock)
  })

  test('Should find a product', async () => {
    const sut = new ProductRepository()
    ProductModel.create({
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    const product = await sut.find('1')
    expect(product.name).toBe('Product 1')
    expect(product.description).toBe('Product 1 description')
    expect(product.purchasePrice).toBe(100)
    expect(product.stock).toBe(10)
  })
})