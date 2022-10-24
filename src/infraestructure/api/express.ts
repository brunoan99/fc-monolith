import express, { Express }  from 'express'
import { Sequelize } from 'sequelize-typescript'
import { OrderModel } from '../../modules/checkout/repository/order.model'
import { ProductOrderModel } from '../../modules/checkout/repository/product.model'
import { ClientModel } from '../../modules/client-adm/repository/client.model'
import { InvoiceModel } from '../../modules/invoice/repository/invoice.model'
import { ProductInvoiceModel } from '../../modules/invoice/repository/product.model'
import { TransactionModel } from '../../modules/payment/repository/transaction.model'
import { ProductModel } from '../../modules/product-adm/repository/product.model'
import { ProductCatalogModel } from '../../modules/store-catalog/repository/product.model'
import { checkoutRoute } from './routes/checkout.route'
import { clientRoute } from './routes/client.route'
import { invoiceRoute } from './routes/invoice.route'
import { productRoute } from './routes/product.route'

export const app: Express = express()
app.use(express.json())
app.use('/products', productRoute)
app.use('/clients', clientRoute)
app.use('/checkout', checkoutRoute)
app.use('/invoice', invoiceRoute)

export let sequelize: Sequelize

async function setupDb() {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  })
  sequelize.addModels([ClientModel, ProductCatalogModel, ProductModel, TransactionModel, InvoiceModel, ProductInvoiceModel, OrderModel, ProductOrderModel ])
  await sequelize.sync()
}

setupDb()