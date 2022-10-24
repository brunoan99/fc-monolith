import { Client } from '../../domain/entity/client.entity'
import { ClientGateway } from '../../gateway/client.gateway'
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
    const output = await sut.execute(input)
    expect(clientRepoSpy).toHaveBeenCalled()
    expect(output.id).toBeDefined()
    expect(output.name).toBe(input.name)
    expect(output.email).toBe(input.email)
    expect(output.document).toBe(input.document)
    expect(output.street).toBe(input.street)
    expect(output.number).toBe(input.number)
    expect(output.complement).toBe(input.complement)
    expect(output.city).toBe(input.city)
    expect(output.state).toBe(input.state)
    expect(output.zipCode).toBe(input.zipCode)
  })
})