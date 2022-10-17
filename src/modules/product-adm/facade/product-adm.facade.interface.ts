export default interface ProductAdmFacadeInterface {
  addProduct(input: AddProductFacadeInputDTO): Promise<void>
  checkStock(input: CheckStockFacadeInputDTO): Promise<CheckStockFacadeOutputDTO>
}

export interface AddProductFacadeInputDTO {
  id?: string
  name: string
  description: string
  purchasePrice: number
  stock: number
}

export interface CheckStockFacadeInputDTO {
  productId: string
}

export interface CheckStockFacadeOutputDTO {
  id?: string
  stock: number
}