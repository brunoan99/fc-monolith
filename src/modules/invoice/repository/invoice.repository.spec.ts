import { Sequelize } from 'sequelize-typescript'
import { Invoice } from '../domain/entity/invoice.entity'
import { Product } from '../domain/entity/product.entity'
import { Address } from '../domain/value-object/address.value-object'
import { InvoiceModel } from './invoice.model'
import { InvoiceRepository } from './invoice.repository'
import { ProductInvoiceModel } from './product.model'

const makeInvoiceEntity = () => {
  return new Invoice({
    name: 'any name',
    document: 'any document',
    address: new Address({
      street: 'street',
      number: 'number',
      complement: 'complement',
      city: 'city',
      state: 'state',
      zipCode: 'zipCode',
    }),
    items: [
      new Product({
        name: 'product1',
        price: 10
      }),
      new Product({
        name: 'product2',
        price: 20
      }),
      new Product({
        name: 'product3',
        price: 30
      })
    ]
  })
}

describe('Client Repository', () => {
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

  test('Should save a invoice', async () => {
    const sut = new InvoiceRepository()
    const invoice = makeInvoiceEntity()
    await sut.add(invoice)
    const invoiceFoundOnDb = await InvoiceModel.findByPk(invoice.id.id)
    expect(invoiceFoundOnDb.name).toBe(invoice.name)
    expect(invoiceFoundOnDb.document).toBe(invoice.document)
    expect(invoiceFoundOnDb.street).toBe(invoice.address.street)
    expect(invoiceFoundOnDb.number).toBe(invoice.address.number)
    expect(invoiceFoundOnDb.complement).toBe(invoice.address.complement)
    expect(invoiceFoundOnDb.city).toBe(invoice.address.city)
    expect(invoiceFoundOnDb.state).toBe(invoice.address.state)
    expect(invoiceFoundOnDb.zipCode).toBe(invoice.address.zipCode)
    expect(invoiceFoundOnDb.createdAt).toStrictEqual(invoice.createdAt)
    expect(invoiceFoundOnDb.updatedAt).toStrictEqual(invoice.updatedAt)
    for (const item of invoice.items) {
      const itemFoundOnDb = await ProductInvoiceModel.findByPk(item.id.id)
      expect(itemFoundOnDb.name).toBe(item.name)
      expect(itemFoundOnDb.price).toBe(item.price)
    }
  })

  test('Should find a invoice', async () => {
    const sut = new InvoiceRepository()
    const invoice = makeInvoiceEntity()
    await InvoiceModel.create({
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    await ProductInvoiceModel.create({
      id: invoice.items[0].id.id,
      invoiceId: invoice.id.id,
      name: invoice.items[0].name,
      price: invoice.items[0].price,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    await ProductInvoiceModel.create({
      id: invoice.items[1].id.id,
      invoiceId: invoice.id.id,
      name: invoice.items[1].name,
      price: invoice.items[1].price,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    await ProductInvoiceModel.create({
      id: invoice.items[2].id.id,
      invoiceId: invoice.id.id,
      name: invoice.items[2].name,
      price: invoice.items[2].price,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    const input = invoice.id.id
    const output = await sut.find(input)
    expect(output.name).toBe(invoice.name)
    expect(output.document).toBe(invoice.document)
    expect(output.address.street).toBe(invoice.address.street)
    expect(output.address.number).toBe(invoice.address.number)
    expect(output.address.complement).toBe(invoice.address.complement)
    expect(output.address.city).toBe(invoice.address.city)
    expect(output.address.state).toBe(invoice.address.state)
    expect(output.address.zipCode).toBe(invoice.address.zipCode)
    expect(output.items[0].name).toBe(invoice.items[0].name)
    expect(output.items[0].price).toBe(invoice.items[0].price)
    expect(output.items[1].name).toBe(invoice.items[1].name)
    expect(output.items[1].price).toBe(invoice.items[1].price)
    expect(output.items[2].name).toBe(invoice.items[2].name)
    expect(output.items[2].price).toBe(invoice.items[2].price)
    expect(output.items.length).toBe(3)
  })
})