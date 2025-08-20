import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateDokumenSpbuDto {
  @IsInt()
  id_spbu: number;

  @IsInt()
  id_ref_dSPBU: number;

  @IsOptional()
  @IsString()
  file_path?: string;

  @IsOptional()
  @IsString()
  keterangan?: string;
}
