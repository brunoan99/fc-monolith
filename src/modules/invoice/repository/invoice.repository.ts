import { Invoice } from '../domain/entity/invoice.entity'
import { Product } from '../domain/entity/product.entity'
import { Address } from '../domain/value-object/address.value-object'
import { InvoiceGateway } from '../gateway/invoice.gateway'
import { InvoiceModel } from './invoice.model'
import { ProductInvoiceModel } from './product.model'

export class InvoiceRepository implements InvoiceGateway {
  async add(invoice: Invoice): Promise<void> {
    const { address, items } = invoice
    await InvoiceModel.create({
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: address.street,
      number: address.number,
      complement: address.complement,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    })
    items.forEach(async (item) => {
      await ProductInvoiceModel.create({
        id: item.id.id,
        invoiceId: invoice.id.id,
        name: item.name,
        price: item.price,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      })
    })
  }

  async find(id: string): Promise<Invoice> {
    const invoiceOnDb = await InvoiceModel.findByPk(id)
    const productsOnDb = await ProductInvoiceModel.findAll({
      where: {
        invoiceId: id
      }
    })
    const products = productsOnDb.map(product => {
      return new Product({
        id: product.id,
        name: product.name,
        price: product.price
      })
    })
    const address = new Address({
      street: invoiceOnDb.street,
      number: invoiceOnDb.number,
      complement: invoiceOnDb.complement,
      city: invoiceOnDb.city,
      state: invoiceOnDb.state,
      zipCode: invoiceOnDb.zipCode,
    })
    const invoice = new Invoice({
      id: invoiceOnDb.id,
      name: invoiceOnDb.name,
      document: invoiceOnDb.document,
      address,
      items: products,
    })
    return invoice
  }
}