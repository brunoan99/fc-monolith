import { Product } from '../../domain/entity/product.entity'
import { ProductGateway } from '../../gateway/product.gateway'
import { FindAllProductsUseCase } from './find-all-products.usecase'

const makeRepositoryStub = (): ProductGateway => {
  class RepositoryStub implements ProductGateway {
    findAll(): Promise<Product[]> {
      return
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    find(id: string): Promise<Product> {
      return
    }
  }
  return new RepositoryStub()
}

describe('FindAllProducts UseCase', () => {
  test('Should find all products', async () => {
    const productRepo = makeRepositoryStub()
    const productRepoSpy = jest.spyOn(productRepo, 'findAll')
    const product1 = new Product({
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      salesPrice: 100
    })
    const product2 = new Product({
      id: '2',
      name: 'Product 2',
      description: 'Product 2 description',
      salesPrice: 200
    })
    jest.spyOn(productRepo, 'findAll').mockResolvedValueOnce([product1, product2])
    const sut = new FindAllProductsUseCase(productRepo)
    
    const output = await sut.execute()
    expect(productRepoSpy).toHaveBeenCalled()
    expect(output.products.length).toBe(2)
    expect(output.products[0]).toEqual({
      id: product1.id.id,
      name: product1.name,
      description: product1.description,
      salesPrice: product1.salesPrice
    })
    expect(output.products[1]).toEqual({
      id: product2.id.id,
      name: product2.name,
      description: product2.description,
      salesPrice: product2.salesPrice
    })
  })
})