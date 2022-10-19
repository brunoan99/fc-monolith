export interface AddClientInputDTO {
  name: string
  email: string
  address: string
}

export interface AddClientOutputDTO {
  id?: string
  createdAt: Date
  updatedAt: Date
  name: string
  email: string
  address: string
}