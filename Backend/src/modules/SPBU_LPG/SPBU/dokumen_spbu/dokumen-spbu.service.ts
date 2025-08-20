import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DokumenSpbu } from './dokumen-spbu.entity';
import { CreateDokumenSpbuDto } from './dto/create-dokumen-spbu.dto';
import { UpdateDokumenSpbuDto } from './dto/update-dokumen-spbu.dto';

@Injectable()
export class DokumenSpbuService {
  constructor(
    @InjectRepository(DokumenSpbu)
    private repo: Repository<DokumenSpbu>,
  ) {}

  create(dto: CreateDokumenSpbuDto) {
    const doc = this.repo.create(dto);
    return this.repo.save(doc);
  }

  findAll() {
    return this.repo.find({ relations: ['spbu', 'refJenis'] });
  }

  async findOne(id: number) {
    const doc = await this.repo.findOne({ where: { id_dokumenSPBU: id }, relations: ['spbu', 'refJenis'] });
    if (!doc) throw new NotFoundException(`Dokumen SPBU ${id} tidak ditemukan`);
    return doc;
  }

  async update(id: number, dto: UpdateDokumenSpbuDto) {
    const doc = await this.findOne(id);
    Object.assign(doc, dto);
    return this.repo.save(doc);
  }

  async remove(id: number) {
    const doc = await this.findOne(id);
    return this.repo.remove(doc);
  }
}
