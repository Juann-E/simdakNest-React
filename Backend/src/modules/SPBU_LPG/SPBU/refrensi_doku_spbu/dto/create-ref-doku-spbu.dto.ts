import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateRefDokuSpbuDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  nama_jenis_dok: string;
}
