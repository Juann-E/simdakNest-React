// backend/src/modules/public/public.controller.ts

import { Controller, Get, Param } from '@nestjs/common';
import { PublicService } from './public.service';
import { Public } from '../../common/decorators/public.decorator';

@Controller('public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Public()
  @Get('markets')
  findAllMarkets() {
    return this.publicService.findAllMarkets();
  }

  @Public()
  @Get('prices/market/:marketId')
  findPricesForMarket(@Param('marketId') marketId: number) {
    return this.publicService.findPricesForMarket(+marketId);
  }

  // --- TAMBAHKAN ENDPOINT BARU DI BAWAH INI ---
  @Public()
  @Get('chart-data')
  getChartData() {
    return this.publicService.getChartData();
  }
}