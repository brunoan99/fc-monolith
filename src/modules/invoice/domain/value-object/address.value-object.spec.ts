import { Address } from './address.value-object'

const makeValidInput = () => ({
  street: 'string',
  number: 'string',
  complement: 'string',
  city: 'string',
  state: 'string',
  zipCode: 'string',
})

describe('Address ValueObject', () => {
  test('Should return an error if provided street is a empty string', () => {
    const input = makeValidInput()
    input.street = ''
    expect(() => {new Address(input)}).toThrowError('Street is required')
  })
  
  test('Should return an error if provided number is a empty string', () => {
    const input = makeValidInput()
    input.number = ''
    expect(() => {new Address(input)}).toThrowError('Number is required')
  })
  
  test('Should return an error if provided complement is a empty string', () => {
    const input = makeValidInput()
    input.complement = ''
    expect(() => {new Address(input)}).toThrowError('Complement is required')
  })
  
  test('Should return an error if provided city is a empty string', () => {
    const input = makeValidInput()
    input.city = ''
    expect(() => {new Address(input)}).toThrowError('City is required')
  })
  
  test('Should return an error if provided state is a empty string', () => {
    const input = makeValidInput()
    input.state = ''
    expect(() => {new Address(input)}).toThrowError('State is required')
  })
  
  test('Should return an error if provided zipCode is a empty string', () => {
    const input = makeValidInput()
    input.zipCode = ''
    expect(() => {new Address(input)}).toThrowError('ZipCode is required')
  })
})