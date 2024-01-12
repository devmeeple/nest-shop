import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Member } from '../../members/entities/member.entity';
import { Delivery } from './delivery.entity';
import { OrderItem } from './order-item.entity';
import { OrderStatus } from './type/order-status.enum';

/**
 * 데이터베이스 ORDER BY 예약어를 피하고자 관례상 orders 테이블 수정
 * member: 주문회원
 * delivery: 배송정보
 * orderDate: 주문시간
 * orderStatus: 주문상태
 */

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn({ name: 'order_id' })
  id: number;

  @ManyToOne(() => Member, (member) => member.orders)
  @JoinColumn({ name: 'member_id' })
  member: Member;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @OneToOne(() => Delivery)
  @JoinColumn({ name: 'delivery_id' })
  delivery: Delivery;

  @Column()
  orderDate: Date;

  @Column({
    type: 'enum',
    enum: OrderStatus,
  })
  status: OrderStatus;
}
