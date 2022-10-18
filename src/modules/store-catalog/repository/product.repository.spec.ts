import { Sequelize } from 'sequelize-typescript'
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

  afterEach(async () => {
    await sequelize.close()
  })

  test('Should find all products', async () => {
    await ProductModel.create({
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      salesPrice: 100
    })
    await ProductModel.create({
      id: '2',
      name: 'Product 2',
      description: 'Description 2',
      salesPrice: 200
    })
    const sut = new ProductRepository()
    const output = await sut.findAll()
    expect(output.length).toBe(2)
    expect(output[0].id.id).toBe('1')
    expect(output[0].name).toBe('Product 1')
    expect(output[0].description).toBe('Description 1')
    expect(output[0].salesPrice).toBe(100)
    expect(output[1].id.id).toBe('2')
    expect(output[1].name).toBe('Product 2')
    expect(output[1].description).toBe('Description 2')
    expect(output[1].salesPrice).toBe(200)
  })

  test('Should find a product', async () => {
    await ProductModel.create({
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      salesPrice: 100
    })
    const sut = new ProductRepository()
    const input = '1'
    const output = await sut.find(input)
    expect(output.id.id).toBe('1')
    expect(output.name).toBe('Product 1')
    expect(output.description).toBe('Description 1')
    expect(output.salesPrice).toBe(100)
  })
})