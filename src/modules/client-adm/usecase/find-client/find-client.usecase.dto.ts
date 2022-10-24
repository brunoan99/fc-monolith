export interface FindClientInputDTO {
  id: string
}

export interface FindClientOutputDTO {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  email: string
  document: string
  street: string
  number: string
  complement: string
  city: string
  state: string
  zipCode: string
}