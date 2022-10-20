import { Entity } from '../../../@shared/domain/entity/base.entity'
import { Id } from '../../../@shared/domain/value-object/id.value-object'

type ProductProps = {
  id?: string
  name: string
  price: number
}

export class Product extends Entity {
  private _name: string
  private _price: number

  constructor(props: ProductProps) {
    super({ id: new Id(props.id) })
    this._name = props.name
    this._price = props.price
    this.validate()
  }

  get name(): string { return this._name }

  get price(): number { return this._price }

  validate(): void {
    if (this._name === '') {
      throw new Error('Name is required')
    }
    if (this._price <= 0) {
      throw new Error('Price must be greather than zero')
    }
  }
}