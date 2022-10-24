import express, { Request, Response } from 'express'
import { InvoiceRepository } from '../../../modules/invoice/repository/invoice.repository'
import { FindInvoiceUseCase } from '../../../modules/invoice/usecase/find-invoice/find-invoice.usecase'

export const invoiceRoute = express.Router()

invoiceRoute.get('/:id', async (req: Request, res: Response) => {
  const usecase = new FindInvoiceUseCase(new InvoiceRepository())
  try {
    const invoiceDTO = {
      id: req.params.id,
    }
    const output = await usecase.execute(invoiceDTO)
    return res.status(200).json(output)
  } catch (err) {
    return res.status(500).json(err)
  }
})