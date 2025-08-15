import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HargaBarangPasar } from './harga-barang-pasar.entity';
import { CreateHargaBarangPasarDto } from './dto/create-harga-barang-pasar.dto';
import { UpdateHargaBarangPasarDto } from './dto/update-harga-barang-pasar.dto';
import { BarangPasarGrid } from '../barang-pasar-grid/barang-pasar-grid.entity';

@Injectable()
export class HargaBarangPasarService {
  constructor(
    @InjectRepository(HargaBarangPasar)
    private hargaRepo: Repository<HargaBarangPasar>,

    @InjectRepository(BarangPasarGrid)
    private barangPasarRepo: Repository<BarangPasarGrid>,
  ) {}

  async create(dto: CreateHargaBarangPasarDto) {
    const barangPasar = await this.barangPasarRepo.findOne({ 
      where: { id_barang_pasar: dto.idBarangPasar } 
    });
    if (!barangPasar) throw new NotFoundException('Barang pasar tidak ditemukan');

    const harga = this.hargaRepo.create({
      barangPasar,
      harga: dto.harga,
      keterangan: dto.keterangan,
    });

    return this.hargaRepo.save(harga);
  }

  findAll() {
    return this.hargaRepo.find({ 
      relations: ['barangPasar', 'barangPasar.barang', 'barangPasar.pasar'] 
    });
  }

  async findOne(id: number) {
    const harga = await this.hargaRepo.findOne({ 
      where: { id }, 
      relations: ['barangPasar', 'barangPasar.barang', 'barangPasar.pasar'] 
    });
    if (!harga) throw new NotFoundException('Data harga barang pasar tidak ditemukan');
    return harga;
  }

  async update(id: number, dto: UpdateHargaBarangPasarDto) {
    const harga = await this.findOne(id);

    if (dto.idBarangPasar) {
      const barangPasar = await this.barangPasarRepo.findOne({ 
        where: { id_barang_pasar: dto.idBarangPasar } 
      });
      if (!barangPasar) throw new NotFoundException('Barang pasar tidak ditemukan');
      harga.barangPasar = barangPasar;
    }

    if (dto.harga !== undefined) harga.harga = dto.harga;
    if (dto.keterangan !== undefined) harga.keterangan = dto.keterangan;

    return this.hargaRepo.save(harga);
  }

  async remove(id: number) {
    const harga = await this.findOne(id);
    return this.hargaRepo.remove(harga);
  }
}
