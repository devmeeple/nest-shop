import { Column } from 'typeorm';

/**
 * 공통적으로 사용하는 부분을 Embedded Entities로 정의하여 관리
 */
export class Address {
  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  zipcode: string;
}
