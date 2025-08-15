import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HargaBarangPasar } from './harga-barang-pasar.entity';
import { BarangPasarGrid } from '../barang-pasar-grid/barang-pasar-grid.entity';
import { HargaBarangPasarService } from './harga-barang-pasar.service';
import { HargaBarangPasarController } from './harga-barang-pasar.controller';

@Module({
  imports: [TypeOrmModule.forFeature([HargaBarangPasar, BarangPasarGrid])],
  providers: [HargaBarangPasarService],
  controllers: [HargaBarangPasarController],
})
export class HargaBarangPasarModule {}
