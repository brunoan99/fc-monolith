import { UseCaseInterface } from '../../@shared/usecase/usecase.interface'
import { FindInvoiceFacadeInputDTO, FindInvoiceFacadeOutputDTO, GenerateInvoiceFacadeInputDTO, GenerateInvoiceFacadeOutputDTO, InvoiceFacadeInterface } from './facade.interface'

export class InvoiceFacade implements InvoiceFacadeInterface {
  constructor(
    private readonly generateUseCase: UseCaseInterface,
    private readonly findUseCase: UseCaseInterface
  ) {}

  async generateInvoice(input: GenerateInvoiceFacadeInputDTO): Promise<GenerateInvoiceFacadeOutputDTO> {
    const invoice = await this.generateUseCase.execute(input)
    return {
      id: invoice.id,
      name: invoice.name,
      document: invoice.document,
      address: {
        street: invoice.street,
        number: invoice.number,
        complement: invoice.complement,
        city: invoice.city,
        state: invoice.state,
        zipCode: invoice.zipCode,
      },
      items: invoice.items,
      total: invoice.total,
    }
  }

  async findInvoice(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO> {
    const { invoiceId } = input
    return await this.findUseCase.execute({ id: invoiceId})
  }
}