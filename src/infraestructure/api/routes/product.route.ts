import express, { Request, Response } from 'express'
import { ProductRepository } from '../../../modules/product-adm/repository/product.repository'
import { AddProductUseCase } from '../../../modules/product-adm/usecase/add-product/add-product.usecase'

export const productRoute = express.Router()

productRoute.post('/', async (req: Request, res: Response) => {
  const usecase = new AddProductUseCase(new ProductRepository())
  try {
    const productDTO = {
      name: req.body.name,
      description: req.body.description,
      purchasePrice: req.body.purchasePrice,
      stock: req.body.stock
    }
    const output = await usecase.execute(productDTO)
    return res.status(200).json(output)
  } catch (err) {
    return res.status(500).json(err)
  }
})