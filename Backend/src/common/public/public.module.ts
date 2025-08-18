// backend/src/modules/public/public.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicController } from './public.controller';
import { PublicService } from './public.service';
import { NamaPasar } from '../../modules/Kepokmas/nama-pasar/nama-pasar.entity';
import { HargaBarangPasar } from '../../modules/Kepokmas/harga-barang-grid/harga-barang-pasar.entity';
import { BarangPasarGrid } from '../../modules/Kepokmas/barang-pasar-grid/barang-pasar-grid.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([NamaPasar, HargaBarangPasar, BarangPasarGrid]),
  ],
  controllers: [PublicController],
  providers: [PublicService],
})
export class PublicModule {}