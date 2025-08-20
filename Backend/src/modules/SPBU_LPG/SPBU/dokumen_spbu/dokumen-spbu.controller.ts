import {
  Controller, Get, Post, Patch, Delete, Param, Body, Query,
  ParseIntPipe, BadRequestException, UseGuards
} from '@nestjs/common';
import { DokumenSpbuService } from './dokumen-spbu.service';
import { CreateDokumenSpbuDto } from './dto/create-dokumen-spbu.dto';
import { UpdateDokumenSpbuDto } from './dto/update-dokumen-spbu.dto';
import { JwtAuthGuard } from '../../../../auth/jwt-auth.guard';
import { RolesGuard } from '../../../../auth/roles.guard';
import { Roles } from '../../../../common/decorators/roles.decorator';
import { UserRole } from '../../../../common/enums/user-role.enum';

@Controller('dokumen-spbu')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DokumenSpbuController {
  constructor(private readonly service: DokumenSpbuService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  create(@Body() dto: CreateDokumenSpbuDto) {
    return this.service.create(dto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  async findAllOrOne(@Query('id') id?: number) {
    if (id) return this.service.findOne(+id);
    return this.service.findAll();
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  updateByUrl(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDokumenSpbuDto) {
    return this.service.update(id, dto);
  }

  @Patch()
  @Roles(UserRole.ADMIN)
  updateByBody(@Body() dto: UpdateDokumenSpbuDto & { id_dokumenSPBU: number }) {
    if (!dto.id_dokumenSPBU) {
      throw new BadRequestException('id_dokumenSPBU harus disertakan');
    }
    return this.service.update(dto.id_dokumenSPBU, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  removeByUrl(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  @Delete()
  @Roles(UserRole.ADMIN)
  removeByBody(@Body('id_dokumenSPBU', ParseIntPipe) id: number) {
    if (!id) throw new BadRequestException('id_dokumenSPBU harus disertakan');
    return this.service.remove(id);
  }
}
