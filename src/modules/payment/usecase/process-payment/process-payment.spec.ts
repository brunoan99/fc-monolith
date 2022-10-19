import { Transaction } from '../../domain/entity/transaction.entity'
import { PaymentGateway } from '../../gateway/payment.gateway'
import { ProcessPaymentUseCase } from './process-payment.usecase'

const makeRepositoryStub = (): PaymentGateway => {
  class RepositoryStub implements PaymentGateway {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    save(input: Transaction): Promise<Transaction> {
      return
    }
    
  }
  return new RepositoryStub()
}

describe('ProcessPayment UseCase', () => {
  test('should approve a transaction', async  () => {
    const paymentRepo = makeRepositoryStub()
    const transaction = new Transaction({
      orderId: '1',
      amount: 100
    })
    transaction.process()
    const paymentRepoSpy = jest.spyOn(paymentRepo, 'save')
    jest.spyOn(paymentRepo, 'save').mockResolvedValueOnce(transaction)
    const sut = new ProcessPaymentUseCase(paymentRepo)
    const input = {
      orderId: '1',
      amount: 100
    }
    const output = await sut.execute(input)
    expect(paymentRepoSpy).toHaveBeenCalled()
    expect(output.transactionId).toBeDefined()
    expect(output.createdAt).toStrictEqual(transaction.createdAt)
    expect(output.updatedAt).toStrictEqual(transaction.updatedAt)
    expect(output.status).toStrictEqual('approved')
    expect(output.amount).toStrictEqual(transaction.amount)
    expect(output.orderId).toStrictEqual(transaction.orderId)
  })

  test('should decline a transaction', async  () => {
    const paymentRepo = makeRepositoryStub()
    const transaction = new Transaction({
      orderId: '1',
      amount: 50
    })
    transaction.process()
    const paymentRepoSpy = jest.spyOn(paymentRepo, 'save')
    jest.spyOn(paymentRepo, 'save').mockResolvedValueOnce(transaction)
    const sut = new ProcessPaymentUseCase(paymentRepo)
    const input = {
      orderId: '1',
      amount: 50
    }
    const output = await sut.execute(input)
    expect(paymentRepoSpy).toHaveBeenCalled()
    expect(output.transactionId).toBeDefined()
    expect(output.createdAt).toStrictEqual(transaction.createdAt)
    expect(output.updatedAt).toStrictEqual(transaction.updatedAt)
    expect(output.status).toStrictEqual('declined')
    expect(output.amount).toStrictEqual(transaction.amount)
    expect(output.orderId).toStrictEqual(transaction.orderId)
  })
})