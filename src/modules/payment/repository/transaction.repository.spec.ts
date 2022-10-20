import { Sequelize } from 'sequelize-typescript'
import { Transaction } from '../domain/entity/transaction.entity'
import { TransactionModel } from './transaction.model'
import { TransactionRepository } from './transaction.repository'

describe('Client Repository', () => {
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

  test('Should save a transaction', async () => {
    const sut = new TransactionRepository()
    const transaction = new Transaction({
      id: '1',
      orderId: '1',
      amount: 100,
    })
    await sut.save(transaction)
    const transactionFoundOnDb = await TransactionModel.findByPk(transaction.id.id)
    expect(transactionFoundOnDb.id).toBe(transaction.id.id)
    expect(transactionFoundOnDb.orderId).toBe(transaction.orderId)
    expect(transactionFoundOnDb.amount).toBe(transaction.amount)
    expect(transactionFoundOnDb.createdAt).toStrictEqual(transaction.createdAt)
    expect(transactionFoundOnDb.updatedAt).toStrictEqual(transaction.updatedAt)
  })
})