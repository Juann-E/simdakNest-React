import { PartialType } from '@nestjs/mapped-types';
import { CreateHargaBarangPasarDto } from './create-harga-barang-pasar.dto';
import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateHargaBarangPasarDto extends PartialType(CreateHargaBarangPasarDto) {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  id_harga?: number; 
}
