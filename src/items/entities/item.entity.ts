import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { Category } from './category.entity';
import { NotEnoughStockException } from '../../common/exception/not-enough-stock.exception';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Item {
  @PrimaryGeneratedColumn({ name: 'item_id' })
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  stockQuantity: number;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  /**
   * 비즈니스 로직
   * 데이터를 가지고 있는 엔티티에 비즈니스 로직을 추가하여 응집력을 높인다
   * 재고 증가
   */
  addStock(quantity: number) {
    this.stockQuantity += quantity;
  }

  /**
   * 재고 감소
   */
  removeStock(quantity: number) {
    const restStock = this.stockQuantity - quantity;
    if (restStock < 0) {
      throw new NotEnoughStockException('추가재고가 필요합니다');
    }
    this.stockQuantity = restStock;
  }
}
