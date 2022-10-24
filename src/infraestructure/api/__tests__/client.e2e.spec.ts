import { app, sequelize } from '../express'
import request from 'supertest'

describe('Client E2E', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })
  
  afterAll(async () => {
    await sequelize.close()
  })

  test('should create a client', async () => {
    await request(app)
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
      .then(res => {
        expect(res.body.id).toBeDefined() 
        expect(res.body.name).toBe('Client Name',)
        expect(res.body.email).toBe('client@mail.com',)
        expect(res.body.document).toBe('client document',)
        expect(res.body.street).toBe('Client Street',)
        expect(res.body.number).toBe('Client Number',)
        expect(res.body.complement).toBe('Client Complement', )
        expect(res.body.city).toBe('Client City',)
        expect(res.body.state).toBe('Client State',)
        expect(res.body.zipCode).toBe('Client ZipCode')
      })
  })
})