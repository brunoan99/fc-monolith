import { Id } from '../value-object/id.value-object'

type EntityProps = {
  id?: Id
  createdAt?: Date
  updatedAt?: Date
}

export class Entity {
  private _id: Id
  private _createdAt: Date
  private _updatedAt: Date

  constructor(props: EntityProps) {
    this._id = props.id || new Id()
    this._createdAt = props.createdAt || new Date()
    this._updatedAt = props.updatedAt || new Date()
  }

  get id(): Id {
    return this._id
  }

  get createdAt(): Date {
    return this._createdAt
  }

  get updatedAt(): Date {
    return this._updatedAt
  }

  set updatedAt(updatedAt: Date) {
    this._updatedAt = updatedAt
  }
}