import {
  Controller, Get, Post, Patch, Delete, Param, Body,
  ParseIntPipe, BadRequestException, UseGuards
} from '@nestjs/common';
import { RefDokuSpbuService } from './ref-doku-spbu.service';
import { CreateRefDokuSpbuDto } from './dto/create-ref-doku-spbu.dto';
import { UpdateRefDokuSpbuDto } from './dto/update-ref-doku-spbu.dto';
import { JwtAuthGuard } from '../../../../auth/jwt-auth.guard';
import { RolesGuard } from '../../../../auth/roles.guard';
import { Roles } from '../../../../common/decorators/roles.decorator';
import { UserRole } from '../../../../common/enums/user-role.enum';

@Controller('ref-doku-spbu')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RefDokuSpbuController {
  constructor(private readonly service: RefDokuSpbuService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  create(@Body() dto: CreateRefDokuSpbuDto) {
    return this.service.create(dto);
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

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRefDokuSpbuDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
