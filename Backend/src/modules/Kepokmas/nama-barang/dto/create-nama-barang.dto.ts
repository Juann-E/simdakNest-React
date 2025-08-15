import { IsNotEmpty, IsString, MaxLength, IsNumber, IsOptional } from 'class-validator';

export class CreateNamaBarangDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  namaBarang: string;

  @IsNotEmpty()
  @IsNumber()
  idSatuan: number;

  @IsOptional()
  @IsString()
  keterangan?: string;
}
