import { PaymentFacade } from '../facade/payment.facade'
import { TransactionRepository } from '../repository/transaction.repository'
import { ProcessPaymentUseCase } from '../usecase/process-payment/process-payment.usecase'

export class PaymentFacadeFactory {
  static create() {
    const transactionRepo = new TransactionRepository()
    const processPaymentUseCase = new ProcessPaymentUseCase(transactionRepo)
    const paymentFacade = new PaymentFacade(
      processPaymentUseCase
    )
    return paymentFacade
  }
}