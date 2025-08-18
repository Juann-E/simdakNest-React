// backend/src/modules/public/public.controller.ts

import { Controller, Get, Param } from '@nestjs/common';
import { PublicService } from './public.service';
import { Public } from '../decorators/public.decorator';

@Controller('public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Public()
  @Get('markets')
  findAllMarkets() {
    return this.publicService.findAllMarkets();
  }

  @Public()
  @Get('prices/all')
  findAllPrices() {
    return this.publicService.findAllPrices();
  }

  @Public()
  @Get('prices/market/:marketId')
  findPricesForMarket(@Param('marketId') marketId: number) {
    return this.publicService.findPricesForMarket(+marketId);
  }

  @Public()
  @Get('chart-data')
  getChartData() {
    return this.publicService.getChartData();
  }
}