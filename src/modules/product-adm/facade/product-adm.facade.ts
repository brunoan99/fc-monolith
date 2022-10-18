import { UseCaseInterface } from '../../@shared/usecase/usecase.interface'
import { ProductAdmFacadeInterface, AddProductFacadeInputDTO, CheckStockFacadeInputDTO, CheckStockFacadeOutputDTO } from './product-adm.facade.interface'


export class ProductAdmFacade implements ProductAdmFacadeInterface {
  constructor(
    private readonly addUseCase: UseCaseInterface,
    private readonly checkStockUseCase: UseCaseInterface
  ) {}

  async addProduct(input: AddProductFacadeInputDTO): Promise<void> {
    await this.addUseCase.execute(input)
  }

  async checkStock(input: CheckStockFacadeInputDTO): Promise<CheckStockFacadeOutputDTO> {
    const stockInfo = await this.checkStockUseCase.execute(input)
    return stockInfo
  }
}