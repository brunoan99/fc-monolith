import { UseCaseInterface } from '../../@shared/usecase/usecase.interface'
import { FindAllStoreCatalogFacadeOutputDTO, FindStoreCatalogFacadeInputDTO, FindStoreCatalogFacadeOutputDTO, StoreCatalogFacadeInterface } from './store-catalog.facade.interface'

export class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  constructor(
    private readonly findAllUseCase: UseCaseInterface,
    private readonly findUseCase: UseCaseInterface
  ) {}

  async find(input: FindStoreCatalogFacadeInputDTO): Promise<FindStoreCatalogFacadeOutputDTO> {
    const { id } = input
    const product = await this.findUseCase.execute({ id })
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice
    }
  }

  async findAll(): Promise<FindAllStoreCatalogFacadeOutputDTO> {
    const products = await this.findAllUseCase.execute({})
    return products
  }
}