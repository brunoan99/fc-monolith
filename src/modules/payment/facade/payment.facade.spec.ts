import { Sequelize } from 'sequelize-typescript'
import { TransactionModel } from '../repository/transaction.model'
import { TransactionRepository } from '../repository/transaction.repository'
import { ProcessPaymentUseCase } from '../usecase/process-payment/process-payment.usecase'
import { PaymentFacade } from './payment.facade'

describe('ProductAdm Facade', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([TransactionModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })
  
  test('Should process and approve a transaction', async () => {
    const transactionRepo = new TransactionRepository()
    const processPaymentUseCase = new ProcessPaymentUseCase(transactionRepo)
    const sut = new PaymentFacade(
      processPaymentUseCase
    )
    const input = {
      orderId: '1',
      amount: 100
    }
    const transaction = await sut.process(input)
    const transactionFoundOnDb = await TransactionModel.findByPk(transaction.transactionId)
    expect(transactionFoundOnDb.orderId).toBe(transaction.orderId)
    expect(transactionFoundOnDb.amount).toBe(transaction.amount)
    expect(transactionFoundOnDb.status).toBe('approved')
    expect(transactionFoundOnDb.createdAt).toStrictEqual(transaction.createdAt)
    expect(transactionFoundOnDb.updatedAt).toStrictEqual(transaction.updatedAt)
  })
  
  test('Should process and decline a transaction', async () => {
    const transactionRepo = new TransactionRepository()
    const processPaymentUseCase = new ProcessPaymentUseCase(transactionRepo)
    const sut = new PaymentFacade(
      processPaymentUseCase
    )
    const input = {
      orderId: '1',
      amount: 50
    }
    const output = await sut.process(input)
    const transactionFoundOnDb = await TransactionModel.findByPk(output.transactionId)
    expect(transactionFoundOnDb.orderId).toBe(output.orderId)
    expect(transactionFoundOnDb.amount).toBe(output.amount)
    expect(transactionFoundOnDb.status).toBe('declined')
    expect(transactionFoundOnDb.createdAt).toStrictEqual(output.createdAt)
    expect(transactionFoundOnDb.updatedAt).toStrictEqual(output.updatedAt)
  })
})