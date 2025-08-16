import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateHargaBarangPasarDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  idBarangPasar: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  harga: number;

  @IsOptional()
  @IsString()
  keterangan?: string;
}
