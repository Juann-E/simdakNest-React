import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { NamaBarangService } from './nama-barang.service';
import { CreateNamaBarangDto } from './dto/create-nama-barang.dto';
import { UpdateNamaBarangDto } from './dto/update-nama-barang.dto';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { RolesGuard } from '../../../auth/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { UserRole } from '../../../common/enums/user-role.enum';

@Controller('nama-barang')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NamaBarangController {
  constructor(private readonly namaBarangService: NamaBarangService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() dto: CreateNamaBarangDto) {
    return this.namaBarangService.create(dto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  findAll() {
    return this.namaBarangService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  findOne(@Param('id') id: number) {
    return this.namaBarangService.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: number, @Body() dto: UpdateNamaBarangDto) {
    return this.namaBarangService.update(+id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: number) {
    return this.namaBarangService.remove(+id);
  }
}
