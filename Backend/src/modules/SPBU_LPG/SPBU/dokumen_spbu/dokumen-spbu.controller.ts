import {
  Controller, Get, Post, Patch, Delete, Param, Body,
  ParseIntPipe, UseGuards, UseInterceptors, UploadedFile, Res
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { DokumenSpbuService } from './dokumen-spbu.service';
import { CreateDokumenSpbuDto } from './dto/create-dokumen-spbu.dto';
import { UpdateDokumenSpbuDto } from './dto/update-dokumen-spbu.dto';
import { JwtAuthGuard } from '../../../../auth/jwt-auth.guard';
import { RolesGuard } from '../../../../auth/roles.guard';
import { Roles } from '../../../../common/decorators/roles.decorator';
import { UserRole } from '../../../../common/enums/user-role.enum';
import type { Response } from 'express';

@Controller('dokumen-spbu')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DokumenSpbuController {
  constructor(private readonly service: DokumenSpbuService) { }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/dokumen-spbu',
      filename: (req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
        // TANPA ekstensi di server
        cb(null, unique);
      },
    }),
  }))
  create(@Body() dto: CreateDokumenSpbuDto, @UploadedFile() file?: Express.Multer.File) {
    return this.service.create(dto, file);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Get(':id/download')
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  async download(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const { buffer, filename } = await this.service.getDecryptedFile(id);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    return res.send(buffer);
  }

  @Get('spbu/:spbuId/dokumen/:dokumenId')
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  async getBySpbuAndDokumen(
    @Param('spbuId', ParseIntPipe) spbuId: number,
    @Param('dokumenId', ParseIntPipe) dokumenId: number
  ) {
    return this.service.findBySpbuAndDokumen(spbuId, dokumenId);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/dokumen-spbu',
      filename: (req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, unique); // TANPA ekstensi
      },
    }),
  }))

  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDokumenSpbuDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    return this.service.update(id, dto, file);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
