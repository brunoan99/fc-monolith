import { Client } from '../domain/entity/client.entity'
import { ClientGateway } from '../gateway/client.gateway'
import { AddClientUseCase } from './add-client.usecase'

const makeRepositoryStub = (): ClientGateway => {
  class RepositoryStub implements ClientGateway {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    add(client: Client): Promise<void> {
      return
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    find(id: string): Promise<Client> {
      return
    }
  }
  return new RepositoryStub()
}

describe('AddClient UseCase', () => {
  test('should add a client', async  () => {
    const clientRepo = makeRepositoryStub()
    const clientRepoSpy = jest.spyOn(clientRepo, 'add')
    const sut = new AddClientUseCase(clientRepo)
    const input = {
      id: '1',
      name: 'Client 1',
      email: 'client1@mail.com',
      address: 'client 1 address'
    }
    const output = await sut.execute(input)
    expect(clientRepoSpy).toHaveBeenCalled()
    expect(output.id).toBe(input.id)
    expect(output.name).toBe(input.name)
    expect(output.email).toBe(input.email)
    expect(output.address).toBe(input.address)
  })
})