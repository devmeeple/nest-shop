import { Item } from './item.entity';
import { ChildEntity, Column } from 'typeorm';

@ChildEntity()
export class Album extends Item {
  @Column()
  artist: string;

  @Column()
  etc: string;
}
