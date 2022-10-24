import express, { Express }  from 'express'
import { Sequelize } from 'sequelize-typescript'
import { ClientModel } from '../../modules/client-adm/repository/client.model'
import { ProductModel } from '../../modules/product-adm/repository/product.model'
import { clientRoute } from './routes/client.route'
import { productRoute } from './routes/product.route'

export const app: Express = express()
app.use(express.json())
app.use('/products', productRoute)
app.use('/clients', clientRoute)

export let sequelize: Sequelize

async function setupDb() {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  })
  sequelize.addModels([ProductModel, ClientModel])
  await sequelize.sync()
}

setupDb()