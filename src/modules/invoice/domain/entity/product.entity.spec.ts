import { Product } from './product.entity'

const makeValidInput = () => ({
  name: 'any name',
  price: 10
})

describe('Product Entity', () => {
  test('Should return an error if provided name is a empty string', () => {
    const input = makeValidInput()
    input.name = ''
    expect(() => {new Product(input)}).toThrowError('Name is required')
  })

  test('Should return an error if provided price isnt greather than zero', () => {
    const input = makeValidInput()
    input.price = 0
    expect(() => {new Product(input)}).toThrowError('Price must be greather than zero')
    input.price = -5
    expect(() => {new Product(input)}).toThrowError('Price must be greather than zero')
  })

  test('Should return an product with generated id', () => {
    const input = makeValidInput()
    const output = new Product(input)
    expect(output.id).toBeDefined()
  })
})