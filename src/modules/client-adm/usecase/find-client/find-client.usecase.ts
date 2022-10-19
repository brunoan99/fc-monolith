import { UseCaseInterface } from '../../../@shared/usecase/usecase.interface'
import { ClientGateway } from '../../gateway/client.gateway'
import { FindClientInputDTO, FindClientOutputDTO } from './find-client.usecase.dto'

export class FindClientUseCase implements UseCaseInterface {
  constructor(
    private readonly clientRepo: ClientGateway
  ) {}

  async execute(input: FindClientInputDTO): Promise<FindClientOutputDTO> {
    const { id } = input
    const client = await this.clientRepo.find(id)
    return {
      id: client.id.id,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
      name: client.name,
      email: client.email,
      address: client.address
    }
  }
}