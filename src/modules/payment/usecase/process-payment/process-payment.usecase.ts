import { UseCaseInterface } from '../../../@shared/usecase/usecase.interface'
import { Transaction } from '../../domain/entity/transaction.entity'
import { PaymentGateway } from '../../gateway/payment.gateway'
import { ProcessPaymentInputDTO, ProcessPaymentOutputDTO } from './process-payment.dto'

export class ProcessPaymentUseCase implements UseCaseInterface {
  constructor(
    private readonly transactionRepo: PaymentGateway
  ) {}

  async execute(input: ProcessPaymentInputDTO): Promise<ProcessPaymentOutputDTO> {
    const { orderId, amount } = input
    const transaction = new Transaction({
      orderId,
      amount 
    })
    transaction.process()
    const persistTransaction = await this.transactionRepo.save(transaction)
    return {
      transactionId: persistTransaction.id.id,
      createdAt: persistTransaction.createdAt,
      updatedAt: persistTransaction.updatedAt,
      status: persistTransaction.status,
      amount: persistTransaction.amount,
      orderId: persistTransaction.orderId
    }
  }
}