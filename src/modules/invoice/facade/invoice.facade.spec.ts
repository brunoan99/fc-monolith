import { Sequelize } from 'sequelize-typescript'
import { InvoiceModel } from '../repository/invoice.model'
import { InvoiceRepository } from '../repository/invoice.repository'
import { ProductInvoiceModel } from '../repository/product.model'
import { FindInvoiceUseCase } from '../usecase/find-invoice/find-invoice.usecase'
import { GenerateInvoiceUseCase } from '../usecase/generate-invoice/generate-invoice.usecase'
import { InvoiceFacade } from './invoice.facade'

describe('Invoice Facade', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([InvoiceModel, ProductInvoiceModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })
  
  test('Should generate a invoice', async () => {
    const invoiceRepo = new InvoiceRepository()
    const generateInvoiceUseCase = new GenerateInvoiceUseCase(invoiceRepo)
    const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepo)
    const sut = new InvoiceFacade(
      generateInvoiceUseCase,
      findInvoiceUseCase
    )
    const input = {
      name: 'any name',
      document: 'any document',
      street: 'street',
      number: 'number',
      complement: 'complement',
      city: 'city',
      state: 'state',
      zipCode: 'zipCode',
      items: [
        {
          id: 'id1',
          name: 'product1',
          price: 10,
        },
        {
          id: 'id2',
          name: 'product2',
          price: 20,
        },
        {
          id: 'id3',
          name: 'product3',
          price: 30,
        }
      ]
    }
    const output = await sut.generateInvoice(input)
    expect(output.id).toBeDefined()
    expect(output.name).toBe(input.name)
    expect(output.document).toBe(input.document)
    expect(output.items.length).toBe(3)
    expect(output.address).toBeDefined()
    expect(output.total).toBe(60)
  })
  
  test('Should find a invoice', async () => {
    const invoiceRepo = new InvoiceRepository()
    const generateInvoiceUseCase = new GenerateInvoiceUseCase(invoiceRepo)
    const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepo)
    const sut = new InvoiceFacade(
      generateInvoiceUseCase,
      findInvoiceUseCase
    )
    const invoiceDTO = {
      name: 'any name',
      document: 'any document',
      street: 'street',
      number: 'number',
      complement: 'complement',
      city: 'city',
      state: 'state',
      zipCode: 'zipCode',
      items: [
        {
          id: 'id1',
          name: 'product1',
          price: 10,
        },
        {
          id: 'id2',
          name: 'product2',
          price: 20,
        },
        {
          id: 'id3',
          name: 'product3',
          price: 30,
        }
      ]
    }
    const invoice = await sut.generateInvoice(invoiceDTO)
    const output = await sut.findInvoice({ invoiceId: invoice.id })
    expect(output.id).toBeDefined()
    expect(output.name).toBe(invoiceDTO.name)
    expect(output.document).toBe(invoiceDTO.document)
    expect(output.items.length).toBe(3)
    expect(output.address).toBeDefined()
    expect(output.total).toBe(60)
  })
})