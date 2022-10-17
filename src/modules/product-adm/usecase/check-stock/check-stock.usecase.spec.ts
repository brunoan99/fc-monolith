import { Product } from '../../domain/entity/product.entity'
import { ProductGateway } from '../../gateway/product.gateway'
import { CheckStockUseCase } from './check-stock.usecase'

const makeRepositoryStub = (): ProductGateway => {
  class RepositoryStub implements ProductGateway {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    add(product: Product): Promise<void> {
      return
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    find(id: string): Promise<Product> {
      return
    }
  }
  return new RepositoryStub()
}

describe('Check Stock Use Case', () => {
  test('Should get and return stock of a product', async () => {
    const productRepo = makeRepositoryStub()
    const productRepoSpy = jest.spyOn(productRepo, 'find')
    const product = new Product({
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 10,
      stock: 1
    })
    jest.spyOn(productRepo, 'find').mockResolvedValueOnce(product)
    const sut = new CheckStockUseCase(productRepo)
    const input = {
      productId: product.id.id
    }
    const output = await sut.execute(input)
    expect(productRepoSpy).toHaveBeenCalled()
    expect(output.productId).toBe(input.productId)
    expect(output.stock).toBe(1)
  })
})