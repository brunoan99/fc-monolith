import { Address } from '../value-object/address.value-object'
import { Invoice } from './invoice.entity'
import { Product } from './product.entity'

const makeValidItems = () => {
  return [
    new Product({
      name: 'Product1',
      price: 10
    }),
    new Product({
      name: 'Product2',
      price: 20
    }),
    new Product({
      name: 'Product3',
      price: 30
    }),
  ]
}

const makeValidAddress = () => {
  return new Address({
    street: 'street',
    number: 'number',
    complement: 'complement',
    city: 'city',
    state: 'state',
    zipCode: 'zipCode',
  })
}

const makeValidInput = () => ({
  name: 'any name',
  document: 'any document',
  address: makeValidAddress(),
  items: makeValidItems()
})

describe('Product Entity', () => {
  test('Should return an error if provided name is a empty string', () => {
    const input = makeValidInput()
    input.name = ''
    expect(() => {new Invoice(input)}).toThrowError('Name is required')
  })

  test('Should return an error if provided document is a empty string', () => {
    const input = makeValidInput()
    input.document = ''
    expect(() => {new Invoice(input)}).toThrowError('Document is required')
  })

  test('Should return an error if provided address is undefined', () => {
    const input = makeValidInput()
    input.address = undefined
    expect(() => {new Invoice(input)}).toThrowError('Address is required')
  })

  test('Should return an error if items is empty', () => {
    const input = makeValidInput()
    input.items = []
    expect(() => {new Invoice(input)}).toThrowError('Items must contain at least one item')
  })

  test('Should return an invoice with generated id', () => {
    const input = makeValidInput()
    const output = new Invoice(input)
    expect(output.id).toBeDefined()
  })
})