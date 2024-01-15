import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { Address } from '../../common/entities/address.entity';

/**
 * Embedded Entity Column 이름을 지정할 때 prefix 옵션을 주지 않으면
 * addressCity 와 같은 형식으로 컬럼명이 작성된다. (default: true)
 */
@Entity()
export class Member {
  @PrimaryGeneratedColumn({ name: 'member_id' })
  id: number;

  @Column()
  name: string;

  @Column(() => Address, { prefix: false })
  address: Address;

  @OneToMany(() => Order, (order) => order.member)
  orders: Order[];

  /**
   * 초기화 코드 필요 시 필드 추가
   */
  static of(name: string): Member {
    const member = new Member();
    member.name = name;
    return member;
  }
}
