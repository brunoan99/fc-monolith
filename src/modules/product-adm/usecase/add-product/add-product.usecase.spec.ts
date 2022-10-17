import { Product } from '../../domain/entity/product.entity'
import { ProductGateway } from '../../gateway/product.gateway'
import { AddProductUseCase } from './add-product.usecase'

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

describe('Add Product UseCase', () => {
  test('Shoud add a produt', async () => {
    const productRepo = makeRepositoryStub()
    const productRepoSpy = jest.spyOn(productRepo, 'add')
    const sut = new AddProductUseCase(productRepo)
    const input = {
      name: 'Product 1',
      description: 'Product 1 description',
      purchasePrice: 100,
      stock: 10
    }
    const output = await sut.execute(input)
    expect(productRepoSpy).toHaveBeenCalled()
    expect(output.id).toBeDefined()
    expect(output.name).toEqual(input.name)
    expect(output.description).toEqual(input.description)
    expect(output.purchasePrice).toEqual(input.purchasePrice)
    expect(output.stock).toEqual(input.stock)
  })
})