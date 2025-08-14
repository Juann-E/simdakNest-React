import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NamaPasar } from './nama-pasar.entity';
import { CreateNamaPasarDto } from './dto/create-nama-pasar.dto';
import { UpdateNamaPasarDto } from './dto/update-nama-pasar.dto';

@Injectable()
export class NamaPasarService {
  constructor(
    @InjectRepository(NamaPasar)
    private namaPasarRepo: Repository<NamaPasar>,
  ) {}

  async create(dto: CreateNamaPasarDto): Promise<NamaPasar> {
    const pasar = this.namaPasarRepo.create(dto);
    return this.namaPasarRepo.save(pasar);
  }

  async findAll(): Promise<NamaPasar[]> {
    return this.namaPasarRepo.find();
  }

  async findOne(id: number): Promise<NamaPasar> {
    const pasar = await this.namaPasarRepo.findOne({ where: { id } });
    if (!pasar) throw new NotFoundException(`NamaPasar with id ${id} not found`);
    return pasar;
  }

  async update(id: number, dto: UpdateNamaPasarDto): Promise<NamaPasar> {
    const pasar = await this.findOne(id);
    Object.assign(pasar, dto);
    return this.namaPasarRepo.save(pasar);
  }

  async remove(id: number): Promise<void> {
    const pasar = await this.findOne(id);
    await this.namaPasarRepo.remove(pasar);
  }
}
