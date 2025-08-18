import { IsOptional, IsString, MaxLength, IsNumber } from 'class-validator';

export class UpdateNamaBarangDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  namaBarang?: string;

  @IsOptional()
  @IsNumber()
  idSatuan?: number;

  @IsOptional()
  @IsString()
  keterangan?: string;

  @IsOptional()
  @IsString()
  gambar?: string; 
}
