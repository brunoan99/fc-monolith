import { UseCaseInterface } from '../../../@shared/usecase/usecase.interface'
import { Client } from '../../domain/entity/client.entity'
import { ClientGateway } from '../../gateway/client.gateway'
import { AddClientInputDTO, AddClientOutputDTO } from './add-client.usecase.dto'

export class AddClientUseCase implements UseCaseInterface {
  constructor(
    private readonly clientRepo: ClientGateway
  ) {}

  async execute(input: AddClientInputDTO): Promise<AddClientOutputDTO> {
    const { id, name, email, document, street, number, complement, city, state, zipCode } = input
    const client = new Client({ id, name, email, document, street, number, complement, city, state, zipCode })
    await this.clientRepo.add(client)
    return {
      id: client.id.id,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
      name: client.name,
      email: client.email,
      document: client.document,
      street: client.street,
      number: client.number,
      complement: client.complement,
      city: client.city,
      state: client.state,
      zipCode: client.zipCode,
    }
  }
}