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
      email: 'client@mail.com',
      document: 'client 1 document',
      street: 'client 1 street',
      number: 'client 1 number',
      complement: 'client 1 complement',
      city: 'client 1 city',
      state: 'client 1 state',
      zipCode: 'client 1 zipCode',
    })
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
    expect(output.document).toBe(client.document)
    expect(output.street).toBe(client.street)
    expect(output.number).toBe(client.number)
    expect(output.complement).toBe(client.complement)
    expect(output.city).toBe(client.city)
    expect(output.state).toBe(client.state)
    expect(output.zipCode).toBe(client.zipCode)
  })
})