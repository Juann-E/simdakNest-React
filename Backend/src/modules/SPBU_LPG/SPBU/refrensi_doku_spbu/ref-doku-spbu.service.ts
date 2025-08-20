import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefDokuSpbu } from './ref-doku-spbu.entity';
import { CreateRefDokuSpbuDto } from './dto/create-ref-doku-spbu.dto';
import { UpdateRefDokuSpbuDto } from './dto/update-ref-doku-spbu.dto';

@Injectable()
export class RefDokuSpbuService {
  constructor(
    @InjectRepository(RefDokuSpbu)
    private readonly repo: Repository<RefDokuSpbu>,
  ) {}

  async create(dto: CreateRefDokuSpbuDto): Promise<RefDokuSpbu> {
    const newData = this.repo.create(dto);
    return this.repo.save(newData);
  }

  async findAll(): Promise<RefDokuSpbu[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<RefDokuSpbu> {
    const data = await this.repo.findOne({ where: { id_ref_dSPBU: id } });
    if (!data) throw new NotFoundException(`RefDokuSpbu ID ${id} tidak ditemukan`);
    return data;
  }

  async update(id: number, dto: UpdateRefDokuSpbuDto): Promise<RefDokuSpbu> {
    const data = await this.findOne(id);
    Object.assign(data, dto);
    return this.repo.save(data);
  }

  async remove(id: number): Promise<void> {
    const data = await this.findOne(id);
    await this.repo.remove(data);
  }
}
