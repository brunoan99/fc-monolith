import { Sequelize } from 'sequelize-typescript'
import { ClientModel } from '../repository/client.model'
import { ClientRepository } from '../repository/client.repository'
import { AddClientUseCase } from '../usecase/add-client/add-client.usecase'
import { FindClientUseCase } from '../usecase/find-client/find-client.usecase'
import { ClientAdmFacade } from './client-adm.facade'


describe('ProductAdm Facade', () => {
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
  
  test('Should create a client', async () => {
    const clientRepo = new ClientRepository()
    const addClientUseCase = new AddClientUseCase(clientRepo)
    const findClientUseCase = new FindClientUseCase(clientRepo)
    const sut = new ClientAdmFacade(
      addClientUseCase,
      findClientUseCase
    )
    const input = {
      id: '1',
      name: 'Client 1',
      email: 'client@mail.com',
      document: 'client 1 document',
      street: 'client 1 street',
      number: 'client 1 number',
      complement: 'client 1 complement',
      city: 'client 1 city',
      state: 'client 1 state',
      zipCode: 'client 1 zipCode',
    }
    await sut.addClient(input)
    const clientFoundOnDb = await ClientModel.findByPk(input.id)
    expect(clientFoundOnDb.name).toBe(input.name)
    expect(clientFoundOnDb.email).toBe(input.email)
    expect(clientFoundOnDb.document).toBe(input.document)
    expect(clientFoundOnDb.street).toBe(input.street)
    expect(clientFoundOnDb.number).toBe(input.number)
    expect(clientFoundOnDb.complement).toBe(input.complement)
    expect(clientFoundOnDb.city).toBe(input.city)
    expect(clientFoundOnDb.state).toBe(input.state)
    expect(clientFoundOnDb.zipcode).toBe(input.zipCode)
  })
  
  test('Should find a client', async () => {
    const clientRepo = new ClientRepository()
    const addClientUseCase = new AddClientUseCase(clientRepo)
    const findClientUseCase = new FindClientUseCase(clientRepo)
    const sut = new ClientAdmFacade(
      addClientUseCase,
      findClientUseCase
    )
    const clientDTO = {
      id: '1',
      name: 'Client 1',
      email: 'client@mail.com',
      document: 'client 1 document',
      street: 'client 1 street',
      number: 'client 1 number',
      complement: 'client 1 complement',
      city: 'client 1 city',
      state: 'client 1 state',
      zipCode: 'client 1 zipCode',
    }
    await sut.addClient(clientDTO)
    const input = {
      id: '1'
    }
    const output = await sut.findClient(input)
    expect(output.name).toBe(clientDTO.name)
    expect(output.email).toBe(clientDTO.email)
    expect(output.document).toBe(clientDTO.document)
    expect(output.street).toBe(clientDTO.street)
    expect(output.number).toBe(clientDTO.number)
    expect(output.complement).toBe(clientDTO.complement)
    expect(output.city).toBe(clientDTO.city)
    expect(output.state).toBe(clientDTO.state)
    expect(output.zipCode).toBe(clientDTO.zipCode)
  })
})