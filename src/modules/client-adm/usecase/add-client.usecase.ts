import { UseCaseInterface } from '../../@shared/usecase/usecase.interface'
import { Client } from '../domain/entity/client.entity'
import { ClientGateway } from '../gateway/client.gateway'
import { AddClientInputDTO, AddClientOutputDTO } from './add-client.usecase.dto'

export class AddClientUseCase implements UseCaseInterface {
  constructor(
    private readonly clientRepo: ClientGateway
  ) {}

  async execute(input: AddClientInputDTO): Promise<AddClientOutputDTO> {
    const { name, email, address } = input
    const client = new Client({ name, email, address})
    await this.clientRepo.add(client)
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