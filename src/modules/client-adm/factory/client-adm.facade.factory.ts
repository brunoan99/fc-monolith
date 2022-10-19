import { ClientAdmFacade } from '../facade/client-adm.facade'
import { ClientRepository } from '../repository/client.repository'
import { AddClientUseCase } from '../usecase/add-client/add-client.usecase'
import { FindClientUseCase } from '../usecase/find-client/find-client.usecase'

export class ClientAdmFacadeFactory {
  static create() {
    const clientRepo = new ClientRepository()
    const addClientUseCase = new AddClientUseCase(clientRepo)
    const findClientUseCase = new FindClientUseCase(clientRepo)
    const clientAdmFacade = new ClientAdmFacade(
      addClientUseCase,
      findClientUseCase
    )
    return clientAdmFacade
  }
}