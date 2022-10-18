import { Product } from '../../domain/entity/product.entity'
import { ProductGateway } from '../../gateway/product.gateway'
import { FindProductUseCase } from './find-product.usecase'

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
    const productRepoSpy = jest.spyOn(productRepo, 'find')
    const product = new Product({
      id: '1',
      name: 'Product 1',
      description: 'Product 1 description',
      salesPrice: 100
    })
    jest.spyOn(productRepo, 'find').mockResolvedValueOnce(product)
    const sut = new FindProductUseCase(productRepo)
    const input = {
      id: product.id.id
    }
    const output = await sut.execute(input)
    expect(productRepoSpy).toHaveBeenCalled()
    expect(output).toEqual({
      id: product.id.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice
    })
  })
})
