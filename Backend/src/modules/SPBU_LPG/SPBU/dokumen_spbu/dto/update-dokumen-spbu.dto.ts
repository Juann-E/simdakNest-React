import { PartialType } from '@nestjs/mapped-types';
import { CreateDokumenSpbuDto } from './create-dokumen-spbu.dto';

export class UpdateDokumenSpbuDto extends PartialType(CreateDokumenSpbuDto) {}
