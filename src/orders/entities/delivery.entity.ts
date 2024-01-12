import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { Address } from '../../common/entities/address.entity';
import { DeliveryStatus } from './type/delivery-status.enum';

@Entity()
export class Delivery {
  @PrimaryGeneratedColumn({ name: 'delivery_id' })
  id: number;

  @OneToOne(() => Order)
  order: Order;

  @Column(() => Address, { prefix: false })
  address: Address;

  @Column({
    type: 'enum',
    enum: DeliveryStatus,
  })
  status: DeliveryStatus;
}
