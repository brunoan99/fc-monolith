import { Client } from '../../domain/entity/client.entity'
import { ClientGateway } from '../../gateway/client.gateway'
import { FindClientUseCase } from './find-client.usecase'

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

describe('FindClient UseCase', () => {
  test('should find a client', async  () => {
    const clientRepo = makeRepositoryStub()
    const clientRepoSpy = jest.spyOn(clientRepo, 'find')
    const client = new Client({
      name: 'Client 1',
      email: 'client1@mail.com',
      address: 'client 1 address'})
    jest.spyOn(clientRepo, 'find').mockResolvedValueOnce(client)
    const sut = new FindClientUseCase(clientRepo)
    const input = {
      id: client.id.id
    }
    const output = await sut.execute(input)
    expect(clientRepoSpy).toHaveBeenCalled()
    expect(output.id).toBe(client.id.id)
    expect(output.name).toBe(client.name)
    expect(output.email).toBe(client.email)
    expect(output.address).toBe(client.address)
  })
})