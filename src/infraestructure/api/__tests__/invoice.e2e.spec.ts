import { app, sequelize } from '../express'
import request from 'supertest'

describe('Invoice E2E', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })
  
  afterAll(async () => {
    await sequelize.close()
  })

  test('should find a invoice', async () => {
    const client = await request(app)
      .post('/clients')
      .send({
        name: 'Client Name',
        email: 'client@mail.com',
        document: 'client document',
        street: 'Client Street',
        number: 'Client Number',
        complement: 'Client Complement', 
        city: 'Client City',
        state: 'Client State',
        zipCode: 'Client ZipCode'
      })
      .expect(200)
    const product1 = await request(app)
      .post('/products')
      .send({
        name: 'Product Name1',
        description: 'Product Description1',
        purchasePrice: 100,
        stock: 10
      })
      .expect(200)
    const product2 = await request(app)
      .post('/products')
      .send({
        name: 'Product Name2',
        description: 'Product Description2',
        purchasePrice: 200,
        stock: 10
      })
      .expect(200)
    const checkout = await request(app)
      .post('/checkout')
      .send({
        clientId: client.body.id,
        products: [
          {
            productId: product1.body.id
          },
          {
            productId: product2.body.id
          }
        ]
      })
      .expect(200)
    await request(app)
      .get(`/invoice/${checkout.body.invoiceId}`)
      .expect(200)
      .then(res => {
        expect(res.body.id).toBeDefined()
        expect(res.body.total).toBeDefined()
        expect(res.body.createdAt).toBeDefined()
        expect(res.body.updatedAt).toBeDefined()
        expect(res.body.name).toBe(client.body.name)
        expect(res.body.document).toBe(client.body.document)
        expect(res.body.address.street).toBe(client.body.street)
        expect(res.body.address.number).toBe(client.body.number)
        expect(res.body.address.complement).toBe(client.body.complement)
        expect(res.body.address.city).toBe(client.body.city)
        expect(res.body.address.state).toBe(client.body.state)
        expect(res.body.address.zipCode).toBe(client.body.zipCode)
        expect(res.body.items.length).toBe(2)
        expect(res.body.items[0].id).toBe(product1.body.id)
        expect(res.body.items[0].name).toBe(product1.body.name)
        expect(res.body.items[1].id).toBe(product2.body.id)
        expect(res.body.items[1].name).toBe(product2.body.name)
      })
  })
})