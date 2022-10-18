import { StoreCatalogFacade } from '../facade/store-catalog.facade'
import { ProductRepository } from '../repository/product.repository'
import { FindAllProductsUseCase } from '../usecase/find-all-products/find-all-products.usecase'
import { FindProductUseCase } from '../usecase/find-product/find-product.usecase'

export class StoreCatalogFacadeFactory {
  static create(): StoreCatalogFacade {
    const productRepo = new ProductRepository()
    const findUseCase = new FindProductUseCase(productRepo)
    const findAllUseCase = new FindAllProductsUseCase(productRepo)
    const storeCatalogFacade = new StoreCatalogFacade(
      findAllUseCase,
      findUseCase
    )
    return storeCatalogFacade
  }
}