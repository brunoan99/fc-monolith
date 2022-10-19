import { AggregateRoot } from '../../../@shared/domain/entity/aggregate-root.interface'
import { Entity } from '../../../@shared/domain/entity/base.entity'
import { Id } from '../../../@shared/domain/value-object/id.value-object'

type TransactionProps = {
  id: string,
  createdAt?: Date,
  updatedAt?: Date
  amount: number
  orderId: string
  status?: string  
}

export class Transaction extends Entity implements AggregateRoot {
  private _amount: number
  private _orderId: string
  private _status: string
  
  constructor(props: TransactionProps) {
    super({ id: new Id(props.id), createdAt: props.createdAt, updatedAt: props.updatedAt })
    this._amount = props.amount
    this._orderId = props.orderId
    this._status = props.status || 'pending'
    this.validate()
  }

  get amount(): number { return this._amount }

  get orderId(): string { return this._orderId }

  get status(): string { return this._status }

  validate(): void {
    if (this._amount <= 0 ) {
      throw new Error('Amount must be greather than 0')
    }
  }

  approve(): void {
    this._status = 'approved'
  }

  decline(): void {
    this._status = 'declined'
  }

  process(): void {
    if (this._amount >= 100) {
      this.approve()
    } else {
      this.decline()
    }
  }
}