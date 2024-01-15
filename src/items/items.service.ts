import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
  ) {}

  /**
   * 이미 값이 존재하면 UPDATE 없으면 INSERT
   */
  async saveItem(item: Item) {
    return await this.itemRepository.save(item);
  }

  async findItems() {
    return await this.itemRepository.find();
  }

  async findOne(itemId: number) {
    return await this.itemRepository.findOne({ where: { id: itemId } });
  }
}
