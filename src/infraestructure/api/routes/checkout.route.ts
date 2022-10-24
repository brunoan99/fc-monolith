import express, { Request, Response } from 'express'
import { OrderRepository } from '../../../modules/checkout/repository/order.repository'
import { PlaceOrderUseCase } from '../../../modules/checkout/usecase/place-order/place-order.usecase'
import { ClientAdmFacadeFactory } from '../../../modules/client-adm/factory/client-adm.facade.factory'
import { InvoiceFacadeFactory } from '../../../modules/invoice/factory/invoice.facade.factory'
import { PaymentFacadeFactory } from '../../../modules/payment/factory/payment.facade.factory'
import { ProductAdmFacadeFactory } from '../../../modules/product-adm/factory/facade.factory'
import { StoreCatalogFacadeFactory } from '../../../modules/store-catalog/factory/facade.factory'

export const checkoutRoute = express.Router()

checkoutRoute.post('/', async (req: Request, res: Response) => {
  const usecase = new PlaceOrderUseCase(
    ClientAdmFacadeFactory.create(),
    ProductAdmFacadeFactory.create(),
    StoreCatalogFacadeFactory.create(),
    new OrderRepository(),
    InvoiceFacadeFactory.create(),
    PaymentFacadeFactory.create(),
  )
  try {
    const checkoutDTO = {
      clientId: req.body.clientId,
      products: req.body.products,
    }
    const output = await usecase.execute(checkoutDTO)
    return res.status(200).json(output)
  } catch (err) {
    console.error(err)
    return res.status(500).json(err)
  }
})