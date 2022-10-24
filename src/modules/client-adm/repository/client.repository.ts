import { Client } from '../domain/entity/client.entity'
import { ClientGateway } from '../gateway/client.gateway'
import { ClientModel } from './client.model'

export class ClientRepository implements ClientGateway {
  async add(client: Client): Promise<void> {
    await ClientModel.create({
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
      zipcode: client.zipCode,
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
      document: client.document,
      street: client.street,
      number: client.number,
      complement: client.complement,
      city: client.city,
      state: client.state,
      zipCode: client.zipcode,
    })
  }
}