import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HargaBarangPasar } from './harga-barang-pasar.entity';
import { CreateHargaBarangPasarDto } from './dto/create-harga-barang-pasar.dto';
import { UpdateHargaBarangPasarDto } from './dto/update-harga-barang-pasar.dto';

@Injectable()
export class HargaBarangPasarService {
  constructor(
    @InjectRepository(HargaBarangPasar)
    private hargaRepo: Repository<HargaBarangPasar>,
  ) { }

  async create(dto: CreateHargaBarangPasarDto) {
    const harga = this.hargaRepo.create(dto);
    return await this.hargaRepo.save(harga);
  }

  async filter(params: { idHarga?: number; idBarangPasar?: number }) {
    const query = this.hargaRepo.createQueryBuilder('harga')
      .leftJoinAndSelect('harga.barang', 'barang')
      .leftJoinAndSelect('barang.pasar', 'pasar')
      .leftJoinAndSelect('barang.barang', 'nama_barang');

    if (params.idHarga) {
      query.andWhere('harga.id_harga = :id_harga', { id_harga: params.idHarga });
    }

    if (params.idBarangPasar) {
      query.andWhere('harga.id_barang_pasar = :id_barang_pasar', { id_barang_pasar: params.idBarangPasar });
    }

    return await query.getMany();
  }



  async findAll() {
    return await this.hargaRepo.find({ relations: ['barang'] });
  }

  async findOne(id: number) {
    const data = await this.hargaRepo.findOne({ where: { id_harga: id }, relations: ['barang'] });
    if (!data) throw new NotFoundException(`Data dengan ID ${id} tidak ditemukan`);
    return data;
  }

  async update(id: number, dto: UpdateHargaBarangPasarDto) {
    const data = await this.findOne(id);
    Object.assign(data, dto);
    return await this.hargaRepo.save(data);
  }

  async remove(id: number) {
    const data = await this.findOne(id);
    return await this.hargaRepo.remove(data);
  }
}
