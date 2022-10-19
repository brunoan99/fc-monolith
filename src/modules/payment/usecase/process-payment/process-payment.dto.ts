export interface ProcessPaymentInputDTO {
  orderId: string
  amount: number
}


export interface ProcessPaymentOutputDTO {
  transactionId: string
  createdAt: Date
  updatedAt: Date
  status: string
  amount: number
  
  orderId: string
}