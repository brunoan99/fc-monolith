import { AggregateRoot } from '../../../@shared/domain/entity/aggregate-root.interface'
import { Entity } from '../../../@shared/domain/entity/base.entity'
import { Id } from '../../../@shared/domain/value-object/id.value-object'

type ProductProps = {
  id: string
  createdAt?: Date
  updatedAt?: Date
  name: string
  description: string
  salesPrice: number
}

export class Product extends Entity implements AggregateRoot {
  private _name: string
  private _description: string
  private _salesPrice: number

  constructor(props: ProductProps) {
    super({ id: new Id(props.id), createdAt: props.createdAt, updatedAt: props.updatedAt })
    this._name = props.name
    this._description = props.description
    this._salesPrice = props.salesPrice
  }

  get name(): string { return this._name }

  get description(): string { return this._description }

  get salesPrice(): number { return this._salesPrice }
}