import { app, sequelize } from '../express'
import request from 'supertest'

describe('Checkout E2E', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })
  
  afterAll(async () => {
    await sequelize.close()
  })

  test('should create a product', async () => {
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
    await request(app)
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
      .then(res => {
        expect(res.body.id).toBeDefined()
        expect(res.body.total).toBeDefined()
        expect(res.body.status).toBeDefined()
        expect(res.body.invoiceId).toBeDefined()
        expect(res.body.products.length).toBe(2)
      })
  })
})