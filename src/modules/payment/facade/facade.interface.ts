export interface PaymentFacadeInputDTO {
  orderId: string
  amount: number
}

export interface PaymentFacadeOutputDTO {
  transactionId: string
  createdAt: Date
  updatedAt: Date
  orderId: string
  amount: number
  status: string
}

export interface PaymentFacadeInterface {
  process(input: PaymentFacadeInputDTO): Promise<PaymentFacadeOutputDTO>
}