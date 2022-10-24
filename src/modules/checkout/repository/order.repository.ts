import { Client } from '../domain/entity/client.entity'
import { Order } from '../domain/entity/order.entity'
import { Product } from '../domain/entity/product.entity'
import { CheckoutGateway } from '../gateway/checkout.gateway'
import { OrderModel } from './order.model'
import { ProductModel } from './product.model'

export class OrderRepository implements CheckoutGateway {
  async addOrder(order: Order): Promise<void> {
    await OrderModel.create({
      id: order.id.id,
      status: order.status,
      clientName: order.client.name,
      clientEmail: order.client.email,
      clientAddress: order.client.address,
    })
    for (const products of order.products) {
      await ProductModel.create({
        id: products.id.id,
        orderId: order.id.id,
        name: products.name,
        description: products.description,
        salesPrice: products.salesPrice,
      })
    }
  }

  async findOrder(id: string): Promise<Order> {
    const orderOnDb = await OrderModel.findByPk(id)
    if (!orderOnDb) {
      throw new Error('Order not found')
    }
    const productsOnDb = await ProductModel.findAll({where: { orderId: id }})
    const products = productsOnDb.map((p) => {
      return new Product({
        id: p.id,
        name: p.name,
        description: p.description,
        salesPrice: p.salesPrice,
      })
    })
    const client = new Client({
      name: orderOnDb.clientName,
      email: orderOnDb.clientEmail,
      address: orderOnDb.clientAddress,
    })
    return new Order({
      id: orderOnDb.id,
      status: orderOnDb.status,
      client,
      products
    })
  }
}