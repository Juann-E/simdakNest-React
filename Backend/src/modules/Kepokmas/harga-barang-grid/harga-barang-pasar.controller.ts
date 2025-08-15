import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { HargaBarangPasarService } from './harga-barang-pasar.service';
import { CreateHargaBarangPasarDto } from './dto/create-harga-barang-pasar.dto';
import { UpdateHargaBarangPasarDto } from './dto/update-harga-barang-pasar.dto';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { RolesGuard } from '../../../auth/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { UserRole } from '../../../common/enums/user-role.enum';

@Controller('harga-barang-pasar')
@UseGuards(JwtAuthGuard, RolesGuard)
export class HargaBarangPasarController {
  constructor(private readonly service: HargaBarangPasarService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() dto: CreateHargaBarangPasarDto) {
    return this.service.create(dto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  findOne(@Param('id') id: number) {
    return this.service.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: number, @Body() dto: UpdateHargaBarangPasarDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: number) {
    return this.service.remove(+id);
  }
}
