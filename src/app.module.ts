import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { TypeormConfigService } from './common/config/typeorm.config.service';
import { ConfigModule } from '@nestjs/config';
import { MembersModule } from './members/members.module';
import { OrdersModule } from './orders/orders.module';
import { ItemsModule } from './items/items.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeormConfigService,
    }),
    CommonModule,
    MembersModule,
    OrdersModule,
    ItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
