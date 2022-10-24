import { app, sequelize } from '../express'
import request from 'supertest'

describe('Product E2E', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })
  
  afterAll(async () => {
    await sequelize.close()
  })

  test('should create a product', async () => {
    await request(app)
      .post('/products')
      .send({
        name: 'Product Name',
        description: 'Product Description',
        purchasePrice: 100,
        stock: 10
      })
      .expect(200)
      .then(res => {
        expect(res.body.id).toBeDefined()
        expect(res.body.name).toBe('Product Name')
        expect(res.body.description).toBe('Product Description')
        expect(res.body.purchasePrice).toBe(100)
        expect(res.body.stock).toBe(10)
      })
  })
})