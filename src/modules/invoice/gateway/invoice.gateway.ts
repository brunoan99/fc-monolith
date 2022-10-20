import { Invoice } from '../domain/entity/invoice.entity'

export interface InvoiceGateway {
  add(invoice: Invoice): Promise<void>
  find(id: string): Promise<Invoice>
}