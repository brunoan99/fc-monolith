import { Product } from '../domain/entity/product.entity'

export interface ProductGateway {
  findAll(): Promise<Product[]>
  find(id: string): Promise<Product>
}