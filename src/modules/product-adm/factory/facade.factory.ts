import { ProductAdmFacade } from '../facade/product-adm.facade'
import { ProductRepository } from '../repository/product.repository'
import { AddProductUseCase } from '../usecase/add-product/add-product.usecase'
import { CheckStockUseCase } from '../usecase/check-stock/check-stock.usecase'

export class ProductAdmFacadeFactory {
  static create() {
    const productRepo = new ProductRepository()
    const addProductUseCase = new AddProductUseCase(productRepo)
    const checkStockuseCase = new CheckStockUseCase(productRepo)
    const productAdmFacade = new ProductAdmFacade(
      addProductUseCase,
      checkStockuseCase
    )
    return productAdmFacade
  }
}