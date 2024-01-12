import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { Category } from './category.entity';

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
}
