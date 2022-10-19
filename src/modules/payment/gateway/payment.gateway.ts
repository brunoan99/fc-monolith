import { Transaction } from '../domain/entity/transaction.entity'

export interface PaymentGateway {
  save(input: Transaction): Promise<Transaction>
}