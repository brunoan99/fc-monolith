import { UseCaseInterface } from '../../../@shared/usecase/usecase.interface'
import { Product } from '../../domain/entity/product.entity'
import { ProductGateway } from '../../gateway/product.gateway'
import { AddProductInputDto, AddProductOutputDto } from './add-product.dto'

export class AddProductUseCase implements UseCaseInterface {
  constructor(
    private readonly productRepo: ProductGateway,
  ) {}

  async execute(input: AddProductInputDto): Promise<AddProductOutputDto> {
    const props = {
      id: input.id,
      name: input.name,
      description: input.description,
      purchasePrice: input.purchasePrice,
      stock: input.stock,
    }    
    const product = new Product(props)
    await this.productRepo.add(product)
    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock
    }
  }
}