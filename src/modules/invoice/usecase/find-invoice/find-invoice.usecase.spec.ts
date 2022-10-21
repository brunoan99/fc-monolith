import { Invoice } from '../../domain/entity/invoice.entity'
import { Product } from '../../domain/entity/product.entity'
import { Address } from '../../domain/value-object/address.value-object'
import { InvoiceGateway } from '../../gateway/invoice.gateway'
import { FindInvoiceUseCase } from './find-invoice.usecase'

const makeRepositoryStub = (): InvoiceGateway => {
  class RepositoryStub implements InvoiceGateway {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    add(invoice: Invoice): Promise<void> {
      return
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    find(id: string): Promise<Invoice> {
      return
    }
  }
  return new RepositoryStub()
}

const makeValidItems = () => {
  return [
    new Product({
      name: 'Product1',
      price: 10
    }),
    new Product({
      name: 'Product2',
      price: 20
    }),
    new Product({
      name: 'Product3',
      price: 30
    }),
  ]
}

const makeValidAddress = () => {
  return new Address({
    street: 'street',
    number: 'number',
    complement: 'complement',
    city: 'city',
    state: 'state',
    zipCode: 'zipCode',
  })
}

const makeInvoice = () => {
  return new Invoice({
    name: 'any name',
    document: 'any document',
    address: makeValidAddress(),
    items: makeValidItems()
  })
}

describe('GenerateInvoice UseCase', () => {
  test('Should generate the invoice', async () => {
    const invoiceRepo = makeRepositoryStub()
    const invoiceRepoSpy = jest.spyOn(invoiceRepo, 'find')
    jest.spyOn(invoiceRepo, 'find').mockResolvedValueOnce(makeInvoice())
    const invoice = makeInvoice()
    const sut = new FindInvoiceUseCase(invoiceRepo)
    const input = {
      id: '1'
    }
    const output = await sut.execute(input)
    expect(invoiceRepoSpy).toHaveBeenCalled()
    expect(output.id).toBeDefined()
    expect(output.name).toEqual(invoice.name)
    expect(output.document).toEqual(invoice.document)
    expect(output.address.street).toEqual(invoice.address.street)
    expect(output.address.number).toEqual(invoice.address.number)
    expect(output.address.complement).toEqual(invoice.address.complement)
    expect(output.address.city).toEqual(invoice.address.city)
    expect(output.address.state).toEqual(invoice.address.state)
    expect(output.address.zipCode).toEqual(invoice.address.zipCode)
    expect(output.items.length).toEqual(3)
    expect(output.total).toEqual(60)
    expect(output.createdAt).toBeDefined()
    expect(output.updatedAt).toBeDefined()
  })
})