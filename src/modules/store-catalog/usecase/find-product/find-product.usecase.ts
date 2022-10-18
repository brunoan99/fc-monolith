import { UseCaseInterface } from '../../../@shared/usecase/usecase.interface'
import { ProductGateway } from '../../gateway/product.gateway'
import { FindProductInputDTO, FindProductOutputDTO } from './find-product.dto'

export class FindProductUseCase implements UseCaseInterface {
  constructor(
    private readonly productRepo: ProductGateway
  ) {}

  async execute(input: FindProductInputDTO): Promise<FindProductOutputDTO> {
    const { id } = input
    const product = await this.productRepo.find(id)
    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    }
  }
}