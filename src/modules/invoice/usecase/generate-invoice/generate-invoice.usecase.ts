import { UseCaseInterface } from '../../../@shared/usecase/usecase.interface'
import { Invoice } from '../../domain/entity/invoice.entity'
import { Product } from '../../domain/entity/product.entity'
import { Address } from '../../domain/value-object/address.value-object'
import { InvoiceGateway } from '../../gateway/invoice.gateway'
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from './generate-invoice.dto'

export class GenerateInvoiceUseCase implements UseCaseInterface {
  constructor(
    private readonly invoiceRepository: InvoiceGateway,
  ) {}

  async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
    const { name, document, street, number, complement, city, state, zipCode, items } = input
    const address = new Address({street, number, complement, city, state, zipCode})
    const products = items.map(item => {
      return new Product({
        id: item.id,
        name: item.name,
        price: item.price,
      })
    })
    const invoice = new Invoice({
      name,
      document,
      address,
      items: products
    })
    await this.invoiceRepository.add(invoice)
    const total = products.reduce((acc, curr) => acc + curr.price, 0)
    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items: invoice.items.map(item => {
        return {
          id: item.id.id,
          name: item.name,
          price: item.price
        }
      }),
      total,
    }
  }
} 