import { Item } from './item.entity';
import { ChildEntity, Column } from 'typeorm';

@ChildEntity()
export class Movie extends Item {
  @Column()
  director: string;

  @Column()
  actor: string;
}
