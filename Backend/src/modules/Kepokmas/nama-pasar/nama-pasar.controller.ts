import { Controller, Get, Post, Body, Patch, Delete, Param, UseGuards } from '@nestjs/common';
import { NamaPasarService } from './nama-pasar.service';
import { CreateNamaPasarDto } from './dto/create-nama-pasar.dto';
import { UpdateNamaPasarDto } from './dto/update-nama-pasar.dto';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { RolesGuard } from '../../../auth/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { UserRole } from '../../../common/enums/user-role.enum';

@Controller('nama-pasar')
@UseGuards(JwtAuthGuard, RolesGuard)
export class NamaPasarController {
  constructor(private readonly namaPasarService: NamaPasarService) {}

  @Post()
  @Roles(UserRole.ADMIN) // hanya admin
  create(@Body() dto: CreateNamaPasarDto) {
    return this.namaPasarService.create(dto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.OPERATOR) // admin & operator 
  findAll() {
    return this.namaPasarService.findAll();
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN) // hanya admin
  update(@Param('id') id: number, @Body() dto: UpdateNamaPasarDto) {
    return this.namaPasarService.update(+id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN) // hanya admin
  remove(@Param('id') id: number) {
    return this.namaPasarService.remove(+id);
  }
}
