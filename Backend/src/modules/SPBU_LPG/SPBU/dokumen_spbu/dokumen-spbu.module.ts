import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DokumenSpbu } from './dokumen-spbu.entity';
import { DokumenSpbuService } from './dokumen-spbu.service';
import { DokumenSpbuController } from './dokumen-spbu.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DokumenSpbu])],
  controllers: [DokumenSpbuController],
  providers: [DokumenSpbuService],
  exports: [DokumenSpbuService],
})
export class DokumenSpbuModule {}
