export interface AddClientInputDTO {
  id?: string
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

export interface AddClientOutputDTO {
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