import { Sequelize } from 'sequelize-typescript'
import { StoreCatalogFacadeFactory } from '../factory/facade.factory'
import { ProductModel } from '../repository/product.model'

describe('ProductAdm Facade', () => {
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

  test('Should find a product', async () => {
    const sut = StoreCatalogFacadeFactory.create()
    await ProductModel.create({
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      salesPrice: 100,
    })
    const output = await sut.find({ id: '1' })
    expect(output.id).toBe('1')
    expect(output.name).toBe('Product 1')
    expect(output.description).toBe('Description 1')
    expect(output.salesPrice).toBe(100)
  })

  test('Should find ass products', async () => {
    const sut = StoreCatalogFacadeFactory.create()
    await ProductModel.create({
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      salesPrice: 100,
    })
    await ProductModel.create({
      id: '2',
      name: 'Product 2',
      description: 'Description 2',
      salesPrice: 200,
    })
    const output = await sut.findAll()
    expect(output.products.length).toBe(2)
    expect(output.products[0].id).toBe('1')
    expect(output.products[0].name).toBe('Product 1')
    expect(output.products[0].description).toBe('Description 1')
    expect(output.products[0].salesPrice).toBe(100)
    expect(output.products[1].id).toBe('2')
    expect(output.products[1].name).toBe('Product 2')
    expect(output.products[1].description).toBe('Description 2')
    expect(output.products[1].salesPrice).toBe(200)
  })
})