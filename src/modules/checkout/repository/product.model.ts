import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript'

@Table({
  tableName: 'checkout_product',
  timestamps: false,
})
export class ProductOrderModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
    id: string

  @Column({ allowNull: false, field: 'order_id' })
    orderId: string

  @Column({ allowNull: false })  
    name: string

  @Column({ allowNull: false,})
    description: string

  @Column({ allowNull: false, field: 'sales_price' })
    salesPrice: number
}