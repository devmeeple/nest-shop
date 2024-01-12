import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Book } from './entities/book.entity';
import { Category } from './entities/category.entity';
import { Album } from './entities/album.entity';
import { Movie } from './entities/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Book, Album, Movie, Category])],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
