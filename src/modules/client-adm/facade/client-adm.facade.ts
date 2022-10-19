import { UseCaseInterface } from '../../@shared/usecase/usecase.interface'
import { AddClientFacadeInputDTO, ClientAdmFacadeInterface, FindClientFacadeInputDTO, FindClientFacadeOutputDTO } from './client-adm.facade.interface'

export class ClientAdmFacade implements ClientAdmFacadeInterface {
  constructor(
    private readonly addClientUseCase: UseCaseInterface,
    private readonly findClientUseCase: UseCaseInterface
  ) {}

  async addClient(input: AddClientFacadeInputDTO): Promise<void> {
    await this.addClientUseCase.execute(input)
  }

  async findClient(input: FindClientFacadeInputDTO): Promise<FindClientFacadeOutputDTO> {
    const { id } = input
    const client = await this.findClientUseCase.execute({ id })
    return client
  }
}