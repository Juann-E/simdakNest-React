import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefDokuSpbu } from './ref-doku-spbu.entity';
import { RefDokuSpbuService } from './ref-doku-spbu.service';
import { RefDokuSpbuController } from './ref-doku-spbu.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RefDokuSpbu])],
  controllers: [RefDokuSpbuController],
  providers: [RefDokuSpbuService],
  exports: [RefDokuSpbuService],
})
export class RefDokuSpbuModule {}
