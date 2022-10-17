import { Sequelize } from 'sequelize-typescript'
import { ProductModel } from '../repository/product.model'
import { ProductRepository } from '../repository/product.repository'
import { AddProductUseCase } from '../usecase/add-product/add-product.usecase'
import { ProductAdmFacade } from './product-adm.facade'


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
  
  test('Should create a product', async () => {
    const productRepo = new ProductRepository()
    const addProductUseCase = new AddProductUseCase(productRepo)
    const sut = new ProductAdmFacade(
      addProductUseCase,
      undefined
    )
    const input = {
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 10,
      stock: 10,
    }
    await sut.addProduct(input)
    const productFoundOnDb = await ProductModel.findByPk(input.id)
    expect(productFoundOnDb.name).toBe(input.name)
    expect(productFoundOnDb.description).toBe(input.description)
    expect(productFoundOnDb.purchasePrice).toBe(input.purchasePrice)
    expect(productFoundOnDb.stock).toBe(input.stock)
  })
})