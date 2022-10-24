import { UseCaseInterface } from '../../../@shared/usecase/usecase.interface'
import { ClientAdmFacadeInterface } from '../../../client-adm/facade/client-adm.facade.interface'
import { InvoiceFacadeInterface } from '../../../invoice/facade/facade.interface'
import { PaymentFacadeInterface } from '../../../payment/facade/facade.interface'
import { ProductAdmFacadeInterface } from '../../../product-adm/facade/product-adm.facade.interface'
import { StoreCatalogFacadeInterface } from '../../../store-catalog/facade/store-catalog.facade.interface'
import { Client } from '../../domain/entity/client.entity'
import { Order } from '../../domain/entity/order.entity'
import { Product } from '../../domain/entity/product.entity'
import { CheckoutGateway } from '../../gateway/checkout.gateway'
import { PlaceOrderInputDTO, PlaceOrderOutputDTO } from './place-order.dto'

export class PlaceOrderUseCase implements UseCaseInterface {
  constructor(
    private readonly clientFacade: ClientAdmFacadeInterface,
    private readonly productFacade: ProductAdmFacadeInterface,
    private readonly catalogFacade: StoreCatalogFacadeInterface,
    private readonly checkoutRepo: CheckoutGateway,
    private readonly invoiceFacade: InvoiceFacadeInterface,
    private readonly paymentFacade: PaymentFacadeInterface
  ) {}

  private async getProduct(productId: string): Promise<Product> {
    const product = await this.catalogFacade.find({ id: productId })
    if (!product) {
      throw new Error('Product not found')
    }
    return new Product({
      id: product.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    })
  }

  private async validateProducts(input: PlaceOrderInputDTO): Promise<void> {
    if (input.products.length === 0) {
      throw new Error('No products selected')
    }
    for (const p of input.products) {
      const product = await this.productFacade.checkStock({ productId: p.productId })
      if (product.stock <= 0) {
        throw new Error(`Product ${product.productId} is not available in stock`)
      }
    }
  }

  async execute(input: PlaceOrderInputDTO): Promise<PlaceOrderOutputDTO> {
    const { clientId } = input
    const client = await this.clientFacade.findClient({ id: clientId })
    if (!client) {
      throw new Error('Client not found')
    }
    await this.validateProducts(input)
    const products = await Promise.all(
      input.products.map((p => this.getProduct(p.productId)))
    )
    const myClient = new Client({
      id: client.id,
      name: client.name,
      email: client.email,
      address: client.street,
    })
    const order = new Order({
      client: myClient,
      products,
    })
    const payment = await this.paymentFacade.process({
      orderId: order.id.id,
      amount: order.total
    })
    const invoice = 
      payment.status == 'approved' ?
        await this.invoiceFacade.generateInvoice({
          name: client.name,
          document: client.document,
          street: client.street,
          number: client.number,
          complement: client.complement,
          city: client.city,
          state: client.state,
          zipCode: client.zipCode,
          items: products.map((p) => ({
            id: p.id.id,
            name: p.name,
            price: p.salesPrice
          }))
        }) :
        null
    payment.status === 'approved' && order.approve()
    this.checkoutRepo.addOrder(order)
    return {
      id: order.id.id,
      invoiceId: payment.status === 'approved' ? invoice.id : null,
      status: order.status,
      total: order.total,
      products: order.products.map((p) => {
        return {
          productId: p.id.id,
        }
      })
    }
  }
}