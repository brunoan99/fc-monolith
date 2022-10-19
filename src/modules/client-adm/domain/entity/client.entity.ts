import { AggregateRoot } from '../../../@shared/domain/entity/aggregate-root.interface'
import { Entity } from '../../../@shared/domain/entity/base.entity'
import { Id } from '../../../@shared/domain/value-object/id.value-object'

type ClientProps = {
  id?: string
  createdAt?: Date
  updatedAt?: Date
  name: string
  email: string
  address: string
}

export class Client extends Entity implements AggregateRoot {
  private _name: string
  private _email: string
  private _address: string

  constructor(props: ClientProps) {
    super({ id: new Id(props.id) })
    this._name = props.name
    this._email = props.email
    this._address = props.address
  }

  get name(): string { return this._name }
  
  get email(): string { return this._email }

  get address(): string { return this._address }
}