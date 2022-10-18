import { Product } from '../domain/entity/product.entity'
import { ProductGateway } from '../gateway/product.gateway'
import { ProductModel } from './product.model'

export class ProductRepository implements ProductGateway {
  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll()
    return products.map(product => {
      return new Product({
        id: product.id,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice
      })
    })
  }

  async find(id: string): Promise<Product> {
    const product = await ProductModel.findByPk(id)
    return new Product({
      id: product.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice
    })
  }
}