import { Invoice } from '../../domain/entity/invoice.entity'
import { InvoiceGateway } from '../../gateway/invoice.gateway'
import { GenerateInvoiceUseCase } from './generate-invoice.usecase'

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

describe('GenerateInvoice UseCase', () => {
  test('Should generate the invoice', async () => {
    const invoiceRepo = makeRepositoryStub()
    const invoiceRepoSpy = jest.spyOn(invoiceRepo, 'add')
    const sut = new GenerateInvoiceUseCase(invoiceRepo)
    const input = {
      name: 'any name',
      document: 'any document',
      street: 'any street',
      number: 'any number',
      complement: 'any complement',
      city: 'any city',
      state: 'any state',
      zipCode: 'any zipCode',
      items: [
        {
          id: 'id1',
          name: 'item1',
          price: 10
        },
        {
          id: 'id2',
          name: 'item2',
          price: 20
        },
        {
          id: 'id3',
          name: 'item3',
          price: 30
        }
      ]
    }
    const output = await sut.execute(input)
    expect(invoiceRepoSpy).toHaveBeenCalled()
    expect(output.id).toBeDefined()
    expect(output.name).toEqual(input.name)
    expect(output.document).toEqual(input.document)
    expect(output.street).toEqual(input.street)
    expect(output.number).toEqual(input.number)
    expect(output.complement).toEqual(input.complement)
    expect(output.city).toEqual(input.city)
    expect(output.state).toEqual(input.state)
    expect(output.zipCode).toEqual(input.zipCode)
    expect(output.items.length).toEqual(3)
    expect(output.total).toEqual(60)
  })
})