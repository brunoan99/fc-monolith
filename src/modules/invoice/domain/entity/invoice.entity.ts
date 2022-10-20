import { AggregateRoot } from '../../../@shared/domain/entity/aggregate-root.interface'
import { Entity } from '../../../@shared/domain/entity/base.entity'
import { Id } from '../../../@shared/domain/value-object/id.value-object'
import { Address } from '../value-object/address.value-object'
import { Product } from './product.entity'

type InvoiceProps = {
  id?: string
  createdAt?: Date
  updatedAt?: Date
  name: string
  document: string
  address: Address
  items: Product[]
}

export class Invoice extends Entity implements AggregateRoot {
  private _name: string
  private _document: string
  private _address: Address
  private _items: Product[]

  constructor(props: InvoiceProps) {
    super({ id: new Id(props.id), createdAt: props.createdAt, updatedAt: props.updatedAt })
    this._name = props.name
    this._document = props.document
    this._address = props.address
    this._items = props.items
    this.validate()
  }

  get name(): string { return this._name }

  get document(): string { return this._document }

  get address(): Address { return this._address }

  get items(): Product[] { return this._items }

  validate() {
    if (this._name === '') {
      throw new Error('Name is required')
    }
    if (this._document === '') {
      throw new Error('Document is required')
    }
    if (this._address === undefined ) {
      throw new Error('Address is required')
    }
    if (this._items.length === 0) {
      throw new Error('Items must contain at least one item')
    }
  }
}