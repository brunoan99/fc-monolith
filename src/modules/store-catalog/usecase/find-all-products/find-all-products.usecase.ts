import UseCaseInterface from '../../../@shared/usecase/usecase.interface'
import { ProductGateway } from '../../gateway/product.gateway'
import { FindAllProductsDTO } from './find-all-products.dto'

export class FindAllProductsUseCase implements UseCaseInterface {
  constructor(
    private readonly productRepo: ProductGateway
  ) {}

  async execute(): Promise<FindAllProductsDTO> {
    const products = await this.productRepo.findAll()
    return {
      products: products.map(product => {
        return {
          id: product.id.id,
          name: product.name,
          description: product.description,
          salesPrice: product.salesPrice,
        }
      })
    }
  }
}