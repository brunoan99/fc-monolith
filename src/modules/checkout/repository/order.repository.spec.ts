import { Sequelize } from 'sequelize-typescript'
import { Client } from '../domain/entity/client.entity'
import { Order } from '../domain/entity/order.entity'
import { Product } from '../domain/entity/product.entity'
import { OrderModel } from './order.model'
import { OrderRepository } from './order.repository'
import { ProductModel } from './product.model'

const makeFakeOrder = () => {
  return new Order({
    client: new Client({
      name: 'Client 1',
      email: 'any@mail.com',
      address: 'any address'
    }),
    products: [
      new Product({
        name: 'Product 1',
        description: 'product 1 description',
        salesPrice: 10,
      }),
      new Product({
        name: 'Product 2',
        description: 'product 2 description',
        salesPrice: 20,
      }),
    ]
  })
}

describe('', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([OrderModel, ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  test('should add a Order', async () => {
    const sut = new OrderRepository()
    const order = makeFakeOrder()
    await sut.addOrder(order)
    const orderOnDb = await OrderModel.findByPk(order.id.id)
    const productsOnDb = await ProductModel.findAll({ where: { orderId: order.id.id }})
    expect(orderOnDb.clientName).toBe(order.client.name)
    expect(orderOnDb.clientEmail).toBe(order.client.email)
    expect(orderOnDb.clientAddress).toBe(order.client.address)
    expect(productsOnDb.length).toBe(2)
    expect(productsOnDb[0].name).toBe(order.products[0].name)
    expect(productsOnDb[0].description).toBe(order.products[0].description)
    expect(productsOnDb[0].salesPrice).toBe(order.products[0].salesPrice)
    expect(productsOnDb[1].name).toBe(order.products[1].name)
    expect(productsOnDb[1].description).toBe(order.products[1].description)
    expect(productsOnDb[1].salesPrice).toBe(order.products[1].salesPrice)
  })

  test('should find a Order', async () => {
    const sut = new OrderRepository()
    const order = makeFakeOrder()
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
    const orderFound = await sut.findOrder(order.id.id)
    expect(orderFound.client.name).toBe(order.client.name)
    expect(orderFound.client.email).toBe(order.client.email)
    expect(orderFound.client.address).toBe(order.client.address)
    expect(orderFound.products.length).toBe(2)
    expect(orderFound.products[0].name).toBe(order.products[0].name)
    expect(orderFound.products[0].description).toBe(order.products[0].description)
    expect(orderFound.products[0].salesPrice).toBe(order.products[0].salesPrice)
    expect(orderFound.products[1].name).toBe(order.products[1].name)
    expect(orderFound.products[1].description).toBe(order.products[1].description)
    expect(orderFound.products[1].salesPrice).toBe(order.products[1].salesPrice)
  })

  test('should not find a Order', async () => {
    const sut = new OrderRepository()
    const output = sut.findOrder('1')
    await expect(output).rejects.toThrow(new Error('Order not found'))
  })
})