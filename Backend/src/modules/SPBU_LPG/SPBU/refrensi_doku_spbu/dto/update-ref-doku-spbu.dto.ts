import { PartialType } from '@nestjs/mapped-types';
import { CreateRefDokuSpbuDto } from './create-ref-doku-spbu.dto';

export class UpdateRefDokuSpbuDto extends PartialType(CreateRefDokuSpbuDto) {}
