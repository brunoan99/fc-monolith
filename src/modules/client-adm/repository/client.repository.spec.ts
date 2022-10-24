import { Sequelize } from 'sequelize-typescript'
import { Client } from '../domain/entity/client.entity'
import { ClientModel } from './client.model'
import { ClientRepository } from './client.repository'

describe('Client Repository', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([ClientModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  test('Should add a product', async () => {
    const sut = new ClientRepository()
    const client = new Client({
      name: 'Client 1',
      email: 'client@mail.com',
      document: 'client 1 document',
      street: 'client 1 street',
      number: 'client 1 number',
      complement: 'client 1 complement',
      city: 'client 1 city',
      state: 'client 1 state',
      zipCode: 'client 1 zipCode',
    })
    await sut.add(client)
    const clientFoundOnDb = await ClientModel.findByPk(client.id.id)
    expect(clientFoundOnDb.id).toBe(client.id.id)
    expect(clientFoundOnDb.name).toBe(client.name)
    expect(clientFoundOnDb.email).toBe(client.email)
    expect(clientFoundOnDb.document).toBe(client.document)
    expect(clientFoundOnDb.street).toBe(client.street)
    expect(clientFoundOnDb.number).toBe(client.number)
    expect(clientFoundOnDb.complement).toBe(client.complement)
    expect(clientFoundOnDb.city).toBe(client.city)
    expect(clientFoundOnDb.state).toBe(client.state)
    expect(clientFoundOnDb.zipcode).toBe(client.zipCode)
  })

  test('Should find a product', async () => {
    const sut = new ClientRepository()
    const client = new Client({
      name: 'Client 1',
      email: 'client@mail.com',
      document: 'client 1 document',
      street: 'client 1 street',
      number: 'client 1 number',
      complement: 'client 1 complement',
      city: 'client 1 city',
      state: 'client 1 state',
      zipCode: 'client 1 zipCode',
    })
    await ClientModel.create({
      id: client.id.id,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
      name: client.name,
      email: client.email,
      document: client.document,
      street: client.street,
      number: client.number,
      complement: client.complement,
      city: client.city,
      state: client.state,
      zipcode: client.zipCode,
    })
    const input = client.id.id
    const output = await sut.find(input)
    expect(output.name).toBe(client.name)
    expect(output.email).toBe(client.email)
    expect(output.document).toBe(client.document)
    expect(output.street).toBe(client.street)
    expect(output.number).toBe(client.number)
    expect(output.complement).toBe(client.complement)
    expect(output.city).toBe(client.city)
    expect(output.state).toBe(client.state)
    expect(output.zipCode).toBe(client.zipCode)
  })
})