import { InvoiceFacade } from '../facade/invoice.facade'
import { InvoiceRepository } from '../repository/invoice.repository'
import { FindInvoiceUseCase } from '../usecase/find-invoice/find-invoice.usecase'
import { GenerateInvoiceUseCase } from '../usecase/generate-invoice/generate-invoice.usecase'

export class InvoiceFacadeFactory {
  static create() {
    const invoiceRepo = new InvoiceRepository()
    const generateInvoiceUseCase = new GenerateInvoiceUseCase(invoiceRepo)
    const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepo)
    const invoiceFacade = new InvoiceFacade(
      generateInvoiceUseCase,
      findInvoiceUseCase
    )
    return invoiceFacade
  }
}