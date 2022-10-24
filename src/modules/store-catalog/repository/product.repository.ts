import { Product } from '../domain/entity/product.entity'
import { ProductGateway } from '../gateway/product.gateway'
import { ProductCatalogModel } from './product.model'

export class ProductRepository implements ProductGateway {
  async findAll(): Promise<Product[]> {
    const products = await ProductCatalogModel.findAll()
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
    const product = await ProductCatalogModel.findByPk(id)
    if (!product) {
      throw new Error('Product not found')
    }
    return new Product({
      id: product.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice
    })
  }
}