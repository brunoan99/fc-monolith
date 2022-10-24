import { Product } from '../../domain/entity/product.entity'
import { PlaceOrderUseCase } from './place-order.usecase'

const mockDate = new Date(2000, 1, 1)

describe('PlaceOrder UseCase', () => {
  describe('Execute Method', () => {
    test('Should throw an error when client not found', async () => {
      const mockClientFacade = {
        findClient: jest.fn().mockResolvedValueOnce(null)
      }
      //@ts-expect-error - no params in constructor
      const sut = new PlaceOrderUseCase()
      //@ts-expect-error - force set clientFacade
      sut['clientFacade'] = mockClientFacade
      const input = {
        clientId: '1',
        //@ts-expect-error - empty array is any type
        products: []
      }
      await expect(sut.execute(input)).rejects.toThrowError('Client not found')
    })

  })

  describe('validateProducts method', () => {
    //@ts-expect-error - no params in constructor
    const sut = new PlaceOrderUseCase()
    test('Should throw an error when product are not valid', async () => {
      const mockClientFacade = {
        findClient: jest.fn().mockResolvedValueOnce(true)
      }

      const mockValidateProducts = jest
      //@ts-expect-error - spy on private method
        .spyOn(sut, 'validateProducts')
      //@ts-expect-error - not return never
        .mockRejectedValueOnce(new Error('No products selected'))

      //@ts-expect-error - force set clientFacade
      sut['clientFacade'] = mockClientFacade
      const input = {
        clientId: '1',
        //@ts-expect-error - empty array is any type
        products: []
      }
      await expect(() => sut.execute(input)).rejects.toThrowError('No products selected')
      expect(mockValidateProducts).toHaveBeenCalledTimes(1)
    })

    test('Should throw error if no products are selected', async () => {
      const input = {
        clientId: '1',
        //@ts-expect-error - empty array is any type
        products: []
      }
      await expect(
        sut['validateProducts'](input)
      ).rejects.toThrowError('No products selected')
    })
    
    test('Should throw an error if product is out of stock',async () => {
      const mockProductFacade = {
        checkStock: jest.fn(({productId}: {productId: string}) => 
          Promise.resolve({
            productId,
            stock: productId === '1' ? 0 : 1
          })
        )}
      //@ts-expect-error - force set productFacade
      sut['productFacade'] = mockProductFacade
      let input = {
        clientId: '1',
        products: [{ productId: '1' }]
      }
      await expect(
        sut['validateProducts'](input)
      ).rejects.toThrowError('Product 1 is not available in stock')
      input = {
        clientId: '0',
        products: [{ productId: '0' }, { productId: '1' }]
      }
      await expect(
        sut['validateProducts'](input)
      ).rejects.toThrowError('Product 1 is not available in stock')
      expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(3)
      input = {
        clientId: '0',
        products: [{ productId: '0' }, { productId: '2' }, { productId: '1' }]
      }
      await expect(
        sut['validateProducts'](input)
      ).rejects.toThrowError('Product 1 is not available in stock')
      expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(6)
    })
  })

  describe('getProducts method', () => {
    beforeAll(() => {
      jest.useFakeTimers('modern')
      jest.setSystemTime(mockDate)
    })

    afterAll(() => {
      jest.useRealTimers()
    })

    //@ts-expect-error - no params in constructor
    const sut = new PlaceOrderUseCase()
    test('should throw an error when product not found', async () => {
      const mockCatalogFacade = {
        find: jest.fn().mockResolvedValueOnce(null)
      }
      //@ts-expect-error - force set catalogFacade
      sut['catalogFacade'] = mockCatalogFacade
      await expect(
        sut['getProduct']('0')
      ).rejects.toThrowError('Product not found')
    })

    test('should return a product', async () => {
      const mockCatalogFacade = {
        find: jest.fn().mockResolvedValueOnce({
          id: '0',
          name: 'Product name',
          description: 'Product description',
          salesPrice: 10,
        })
      }
      //@ts-expect-error - force set catalogFacade
      sut['catalogFacade'] = mockCatalogFacade
      const output = await sut['getProduct']('0')
      expect(output instanceof Product).toBe(true)
      expect(output.name).toBe('Product name')
      expect(output.description).toBe('Product description')
      expect(output.salesPrice).toBe(10)
    })
  })

  describe('Place an order', () => {
    const clientProps = {
      id: '1c',
      name: 'Client 1',
      document: '0000',
      email: 'client@example.com',
      street: 'some street',
      number: '1',
      complement: 'complement',
      city: 'some city',
      state: 'some state',
      zipCode: '0000'
    }
    const mockClientFacade = {
      addClient: jest.fn(),
      findClient: jest.fn().mockResolvedValue(clientProps)
    }
    const mockPaymentFacade = {
      process: jest.fn()
    }
    const mockCheckoutRepository = {
      findOrder: jest.fn(),
      addOrder: jest.fn()
    }
    const mockInvoiceFacade = {
      generateInvoice: jest.fn().mockResolvedValue({
        id: '1i'
      }),
      findInvoice: jest.fn()
    }
    const sut = new PlaceOrderUseCase(
      mockClientFacade,
      null,
      null,
      mockCheckoutRepository,
      mockInvoiceFacade,
      mockPaymentFacade
    )
    const products = {
      '1': new Product({
        id: '1',
        name: 'Product 1',
        description: 'some description',
        salesPrice: 40,
      }),
      '2': new Product({
        id: '2',
        name: 'Product 2',
        description: 'some description',
        salesPrice: 30,
      })
    }
    const mockValidateProducts = jest
    //@ts-expect-error - spy on private method
      .spyOn(sut, 'validateProducts')
    //@ts-expect-error - spy on private method
      .mockResolvedValue(null)

    const mockGetProduct = jest
    //@ts-expect-error - spy on private method
      .spyOn(sut, 'getProduct')
    //@ts-expect-error - spy on private method
      .mockImplementation((productId: keyof typeof products) => {
        return products[productId]
      })
    test('should not be aprproved', async () => {
      mockPaymentFacade.process = mockPaymentFacade.process.mockReturnValue({
        transactionId: '1t',
        orderId: '1o',
        amount: 100,
        status: 'error',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      const input = {
        clientId: '1c',
        products: [{ productId: '1'}, { productId: '2'}]
      }
      const output = await sut.execute(input)
      expect(output.invoiceId).toBeNull()
      expect(output.total).toBe(70)
      expect(output.products).toStrictEqual([{ productId: '1'}, { productId: '2'}])
      expect(mockClientFacade.findClient).toHaveBeenCalledTimes(1)
      expect(mockClientFacade.findClient).toHaveBeenCalledWith({ id: '1c' })
      expect(mockValidateProducts).toHaveBeenCalledTimes(1)
      expect(mockValidateProducts).toHaveBeenCalledWith(input)
      expect(mockGetProduct).toHaveBeenCalledTimes(2)
      expect(mockCheckoutRepository.addOrder).toHaveBeenCalledTimes(1)
      expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1)
      expect(mockPaymentFacade.process).toHaveBeenCalledWith({
        orderId: output.id,
        amount: output.total
      })
      expect(mockInvoiceFacade.generateInvoice).not.toHaveBeenCalled()
    })

    test('Should be approved', async () => {
      mockPaymentFacade.process = mockPaymentFacade.process.mockReturnValue({
        transactionId: '1t',
        orderId: '1o',
        amount: 100,
        status: 'approved',
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      const input = {
        clientId: '1c',
        products: [{ productId: '1'}, { productId: '2'}]
      }
      const output = await sut.execute(input)
      expect(output.invoiceId).toBe('1i')
      expect(output.total).toBe(70)
      expect(output.products).toStrictEqual([{ productId: '1'}, { productId: '2'}])
      expect(mockClientFacade.findClient).toHaveBeenCalledTimes(1)
      expect(mockClientFacade.findClient).toHaveBeenCalledWith({ id: '1c' })
      expect(mockValidateProducts).toHaveBeenCalledTimes(1)
      expect(mockValidateProducts).toHaveBeenCalledWith(input)
      expect(mockGetProduct).toHaveBeenCalledTimes(2)
      expect(mockCheckoutRepository.addOrder).toHaveBeenCalledTimes(1)
      expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1)
      expect(mockPaymentFacade.process).toHaveBeenCalledWith({
        orderId: output.id,
        amount: output.total
      })
      expect(mockInvoiceFacade.generateInvoice).toHaveBeenCalledTimes(1)
      expect(mockInvoiceFacade.generateInvoice).toHaveBeenCalledWith({
        name: clientProps.name,
        document: clientProps.document,
        street: clientProps.street,
        number: clientProps.number,
        complement: clientProps.complement,
        city: clientProps.city,
        state: clientProps.state,
        zipCode: clientProps.zipCode,
        items: [
          {
            id: products['1'].id.id,
            name: products['1'].name,
            price: products['1'].salesPrice,
          },
          {
            id: products['2'].id.id,
            name: products['2'].name,
            price: products['2'].salesPrice,
          }
        ]
      })
    })
  })
})