import { UseCaseInterface } from '../../../@shared/usecase/usecase.interface'
import { InvoiceGateway } from '../../gateway/invoice.gateway'
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from './find-invoice.dto'

export class FindInvoiceUseCase implements UseCaseInterface {
  constructor(
    private readonly invoiceRepository: InvoiceGateway,
  ) {}

  async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
    const { id } = input
    const invoice = await this.invoiceRepository.find(id)
    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      address: {
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address.state,
        zipCode: invoice.address.zipCode,
      },
      items: invoice.items.map(item => {
        return {
          id: item.id.id,
          name: item.name,
          price: item.price
        }
      }),
      total: invoice.items.reduce((acc, curr) => acc + curr.price, 0),
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    }
  }
}