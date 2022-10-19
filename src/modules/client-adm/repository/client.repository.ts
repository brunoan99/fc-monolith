import { Client } from '../domain/entity/client.entity'
import { ClientGateway } from '../gateway/client.gateway'
import { ClientModel } from './client.model'

export class ClientRepository implements ClientGateway {
  async add(client: Client): Promise<void> {
    await ClientModel.create({
      id: client.id.id,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt
    })
  }

  async find(id: string): Promise<Client> {
    const client = await ClientModel.findByPk(id)
    return new Client({
      id: client.id,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
      name: client.name,
      email: client.email,
      address: client.address,
    })
  }
}