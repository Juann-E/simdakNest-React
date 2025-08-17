import { Controller, Get, Post, Query, Body, Res, BadRequestException } from '@nestjs/common';
import type { Response } from 'express';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  // --- GET JSON ---
  // Contoh: /report?pasarId=6,7&barangId=15,16&start=2025-08-15&end=2025-08-17
  @Get()
  async getReportJson(
    @Query('pasarId') pasarIdsStr?: string,
    @Query('barangId') barangIdsStr?: string,
    @Query('start') start?: string,
    @Query('end') end?: string,
  ) {
    const pasarIds = pasarIdsStr ? pasarIdsStr.split(',').map((id) => parseInt(id)) : [];
    const barangIds = barangIdsStr ? barangIdsStr.split(',').map((id) => parseInt(id)) : [];
    return this.reportService.generateJson(pasarIds, barangIds, start, end);
  }

  // --- POST JSON ---
  @Post()
  async postReportJson(
    @Body('pasarId') pasarIds?: number[],
    @Body('barangId') barangIds?: number[],
    @Body('start') start?: string,
    @Body('end') end?: string,
  ) {
    return this.reportService.generateJson(pasarIds || [], barangIds || [], start, end);
  }

  // --- GET Excel ---
  @Get('excel')
  async getReportExcel(
    @Query('pasarId') pasarIdsStr?: string,
    @Query('barangId') barangIdsStr?: string,
    @Query('start') start?: string,
    @Query('end') end?: string,
    @Res() res?: Response,
  ) {
    if (!res) throw new BadRequestException('Response object required');
    const pasarIds = pasarIdsStr ? pasarIdsStr.split(',').map((id) => parseInt(id)) : [];
    const barangIds = barangIdsStr ? barangIdsStr.split(',').map((id) => parseInt(id)) : [];
    const buffer = await this.reportService.generateExcel(pasarIds, barangIds, start, end);

    res.setHeader(
      'Content-Disposition',
      `attachment; filename=report_${pasarIds.length ? pasarIds.join('_') : 'all'}_${start || 'all'}_${end || 'all'}.xlsx`,
    );
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.end(buffer);
  }

  // --- POST Excel ---
  @Post('excel')
  async postReportExcel(
    @Body('pasarId') pasarIds?: number[],
    @Body('barangId') barangIds?: number[],
    @Body('start') start?: string,
    @Body('end') end?: string,
    @Res() res?: Response,
  ) {
    if (!res) throw new BadRequestException('Response object required');
    const buffer = await this.reportService.generateExcel(pasarIds || [], barangIds || [], start, end);

    res.setHeader(
      'Content-Disposition',
      `attachment; filename=report_${pasarIds?.length ? pasarIds.join('_') : 'all'}_${start || 'all'}_${end || 'all'}.xlsx`,
    );
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.end(buffer);
  }
}
