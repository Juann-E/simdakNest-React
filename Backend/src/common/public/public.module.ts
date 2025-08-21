// backend/src/modules/public/public.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static'; // 1. Import modul serve-static
import { join } from 'path'; // 2. Import 'join' dari 'path'
import { PublicController } from './public.controller';
import { PublicService } from './public.service';
import { NamaPasar } from '../../modules/Kepokmas/nama-pasar/nama-pasar.entity';
import { HargaBarangPasar } from '../../modules/Kepokmas/harga-barang-grid/harga-barang-pasar.entity';
import { BarangPasarGrid } from '../../modules/Kepokmas/barang-pasar-grid/barang-pasar-grid.entity';
import { Spbu } from '../../modules/SPBU_LPG/SPBU/spbu.entity';
import { Agen } from '../../modules/SPBU_LPG/Agen/agen.entity';
import { PangkalanLpg } from '../../modules/SPBU_LPG/PangkalanLpg/pangkalan-lpg.entity';
import { Spbe } from '../../modules/SPBU_LPG/Spbe/spbe.entity';

@Module({
  imports: [
    // 3. Tambahkan konfigurasi ServeStaticModule
    ServeStaticModule.forRoot({
      // rootPath menunjuk ke folder 'uploads' di direktori utama proyek Anda
      rootPath: join(process.cwd(), 'uploads'),
      // serveRoot secara default adalah '/', ini berarti URL akan mengikuti struktur folder
    }),
    TypeOrmModule.forFeature([NamaPasar, HargaBarangPasar, BarangPasarGrid, Spbu, Agen, PangkalanLpg, Spbe]),
  ],
  controllers: [PublicController],
  providers: [PublicService],
})
export class PublicModule {}