export interface ClientAdmFacadeInterface {
  addClient(input: AddClientFacadeInputDTO): Promise<void>
  findClient(input: FindClientFacadeInputDTO): Promise<FindClientFacadeOutputDTO>
}

export interface AddClientFacadeInputDTO {
  id?: string
  createdAt?: Date
  updatedAt?: Date
  name: string
  email: string
  address: string
}

export interface FindClientFacadeInputDTO {
  id: string
}

export interface FindClientFacadeOutputDTO {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  email: string
  address: string
}