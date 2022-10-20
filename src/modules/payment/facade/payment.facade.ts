import { UseCaseInterface } from '../../@shared/usecase/usecase.interface'
import { PaymentFacadeInputDTO, PaymentFacadeInterface, PaymentFacadeOutputDTO } from './facade.interface'

export class PaymentFacade implements PaymentFacadeInterface {
  constructor(
    private readonly processUseCase: UseCaseInterface
  ) {}

  async process(input: PaymentFacadeInputDTO): Promise<PaymentFacadeOutputDTO> {
    return await this.processUseCase.execute(input)
  }
}