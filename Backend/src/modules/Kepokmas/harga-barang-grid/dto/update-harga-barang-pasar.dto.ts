import { PartialType } from '@nestjs/mapped-types';
import { CreateHargaBarangPasarDto } from './create-harga-barang-pasar.dto';

export class UpdateHargaBarangPasarDto extends PartialType(CreateHargaBarangPasarDto) {}
