import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from '../../items/entities/item.entity';
import { Order } from './order.entity';

@Entity('order_item')
export class OrderItem {
  @PrimaryGeneratedColumn({ name: 'order_item_id' })
  id: number;

  @ManyToOne(() => Item)
  @JoinColumn({ name: 'item_id' })
  item: Item;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
