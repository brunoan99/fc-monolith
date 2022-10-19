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
      address: 'Client 1 Address',
    }
    await sut.addClient(input)
    const clientFoundOnDb = await ClientModel.findByPk(input.id)
    expect(clientFoundOnDb.name).toBe(input.name)
    expect(clientFoundOnDb.email).toBe(input.email)
    expect(clientFoundOnDb.address).toBe(input.address)
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
      address: 'Client 1 Address',
    }
    await sut.addClient(clientDTO)
    const input = {
      id: '1'
    }
    const output = await sut.findClient(input)
    expect(output.name).toBe(clientDTO.name)
    expect(output.email).toBe(clientDTO.email)
    expect(output.address).toBe(clientDTO.address)
  })
})