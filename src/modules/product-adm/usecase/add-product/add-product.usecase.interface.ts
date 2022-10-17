import { AddProductInputDto, AddProductOutputDto } from './add-product.dto'

export interface AddProductUseCaseInterface {
  execute(input: AddProductInputDto): Promise<AddProductOutputDto>
}