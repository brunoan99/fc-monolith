import { ProductAdmFacade } from '../facade/product-adm.facade'
import { ProductRepository } from '../repository/product.repository'
import { AddProductUseCase } from '../usecase/add-product/add-product.usecase'

export class ProductAdmFacadeFactory {
  static create() {
    const productRepo = new ProductRepository()
    const addProductUseCase = new AddProductUseCase(productRepo)
    const productAdmFacade = new ProductAdmFacade(
      addProductUseCase,
      undefined
    )
    return productAdmFacade
  }
}