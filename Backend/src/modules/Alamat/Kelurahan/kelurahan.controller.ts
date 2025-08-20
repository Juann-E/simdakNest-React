import {
  Controller, Get, Post, Patch, Delete, Param, Body, Query,
  UseGuards, ParseIntPipe
} from '@nestjs/common';
import { KelurahanService } from './kelurahan.service';
import { CreateKelurahanDto } from './dto/create-kelurahan.dto';
import { UpdateKelurahanDto } from './dto/update-kelurahan.dto';
import { JwtAuthGuard } from '../../../auth/jwt-auth.guard';
import { RolesGuard } from '../../../auth/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { UserRole } from '../../../common/enums/user-role.enum';

@Controller('kelurahan')
@UseGuards(JwtAuthGuard, RolesGuard)
export class KelurahanController {
  constructor(private readonly kelurahanService: KelurahanService) { }

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() dto: CreateKelurahanDto) {
    return this.kelurahanService.create(dto);
  }
  
  @Get()
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  async findAllOrFiltered(
    @Query('id_kelurahan') idKelurahan?: number,
    @Query('id_kecamatan') idKecamatan?: number,
    @Body('id_kelurahan') bodyIdKelurahan?: number,
    @Body('id_kecamatan') bodyIdKecamatan?: number,
  ) {
    const finalIdKelurahan = idKelurahan ?? bodyIdKelurahan;
    const finalIdKecamatan = idKecamatan ?? bodyIdKecamatan;

    if (finalIdKelurahan) {
      return this.kelurahanService.findOne(+finalIdKelurahan);
    }

    if (finalIdKecamatan) {
      return this.kelurahanService.findByKecamatan(+finalIdKecamatan);
    }

    return this.kelurahanService.findAll();
  }


  // PATCH pakai dua versi route
  @Patch(':id')
  @Roles(UserRole.ADMIN)
  updateByUrl(@Param('id') id: number, @Body() dto: UpdateKelurahanDto) {
    return this.kelurahanService.update(+id, dto);
  }

  @Patch()
  @Roles(UserRole.ADMIN)
  updateByBody(@Body() dto: UpdateKelurahanDto & { id: number }) {
    return this.kelurahanService.update(+dto.id, dto);
  }

  // DELETE pakai dua versi route
  @Delete(':id')
  @Roles(UserRole.ADMIN)
  removeByUrl(@Param('id') id: number) {
    return this.kelurahanService.remove(+id);
  }

  @Delete()
  @Roles(UserRole.ADMIN)
  removeByBody(@Body('id') id: number) {
    return this.kelurahanService.remove(+id);
  }

}
