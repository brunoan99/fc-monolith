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
      address: 'client 1 address'
    })
    await sut.add(client)
    const clientFoundOnDb = await ClientModel.findByPk(client.id.id)
    expect(clientFoundOnDb.id).toBe(client.id.id)
    expect(clientFoundOnDb.name).toBe(client.name)
    expect(clientFoundOnDb.email).toBe(client.email)
    expect(clientFoundOnDb.address).toBe(client.address)
  })

  test('Should find a product', async () => {
    const sut = new ClientRepository()
    const client = new Client({
      name: 'Client 1',
      email: 'client@mail.com',
      address: 'client 1 address'
    })
    await ClientModel.create({
      id: client.id.id,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt
    })
    const input = client.id.id
    const output = await sut.find(input)
    expect(output.name).toBe(client.name)
    expect(output.email).toBe(client.email)
    expect(output.address).toBe(client.address)
  })
})