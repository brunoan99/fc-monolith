import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript'

@Table({
  tableName: 'order',
  timestamps: false,
})
export class OrderModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
    id: string

  @Column({ allowNull: false, field: 'client_name' })  
    clientName: string

  @Column({ allowNull: false, field: 'client_email' })  
    clientEmail: string
  
  @Column({ allowNull: false, field: 'client_address' })  
    clientAddress: string
  
  @Column({ allowNull: false })  
    status: string
}