import { UseCaseInterface } from '../../../@shared/usecase/usecase.interface'
import { ProductGateway } from '../../gateway/product.gateway'
import { CheckStockInputDto, CheckStockOutputDto } from './check-stock.dto'

export class CheckStockUseCase implements UseCaseInterface {
  constructor(
    private readonly productRepo: ProductGateway
  ) {}
  
  async execute(input: CheckStockInputDto): Promise<CheckStockOutputDto> {
    const { productId } = input
    const product = await this.productRepo.find(productId)
    return {
      productId: product.id.id,
      stock: product.stock
    }
  }
}