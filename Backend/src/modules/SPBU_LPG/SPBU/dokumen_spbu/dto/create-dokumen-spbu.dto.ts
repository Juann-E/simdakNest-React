import { IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateDokumenSpbuDto {
  @IsInt()
  @Type(() => Number)
  id_spbu: number;

  @IsInt()
  @Type(() => Number)
  id_ref_dSPBU: number;

  @IsOptional()
  @IsString()
  keterangan?: string;

  @IsOptional()
  @IsString()
  file_path?: string;

  @IsOptional()
  @IsString()
  file_ext?: string;

  @IsOptional()
  @IsString()
  file_name?: string;
}
