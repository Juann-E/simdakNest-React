import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateHargaBarangPasarDto {
  @IsNotEmpty()
  @IsNumber()
  idBarangPasar: number;

  @IsNotEmpty()
  @IsNumber()
  harga: number;

  @IsOptional()
  @IsString()
  keterangan?: string;
}
