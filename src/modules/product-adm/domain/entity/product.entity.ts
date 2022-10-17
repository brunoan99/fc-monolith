import { AggregateRoot } from '../../../@shared/domain/entity/aggregate-root.interface'
import { Entity } from '../../../@shared/domain/entity/base.entity'
import { Id } from '../../../@shared/domain/value-object/id.value-object'

type ProductProps = {
  id?: string
  createdAt?: Date
  updatedAt?: Date
  name: string
  description: string
  purchasePrice: number
  stock: number
}

export class Product extends Entity implements AggregateRoot {
  private _name: string
  private _description: string
  private _purchasePrice: number
  private _stock: number
  
  constructor(props: ProductProps) {
    const id = new Id(props.id)
    super({ id, createdAt: props.createdAt, updatedAt: props.updatedAt })
    this._name = props.name
    this._description = props.description
    this._purchasePrice = props.purchasePrice
    this._stock = props.stock
  }

  get name(): string { return this._name }

  set name(name: string) { this._name = name }

  get description(): string { return this._description }
  
  set description (description: string) { this._description = description }
  
  get purchasePrice(): number { return this._purchasePrice }
  
  set purchasePrice(purchasePrice: number) { this._purchasePrice = purchasePrice }

  get stock(): number { return this._stock }

  set stock(stock: number) { this._stock = stock }

}