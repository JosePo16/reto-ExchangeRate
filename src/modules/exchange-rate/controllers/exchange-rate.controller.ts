import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { Public } from 'src/modules/auth/decorators/public.decorator';
import { ExchangeRateService } from '../services/exchange-rate.service';
import { ExchangeRateinterface } from '../interfaces/exchangeRate.interface';
import { PinoLogger } from 'nestjs-pino';

@UseGuards(JwtAuthGuard)
@Controller('api/exchange')
export class ExchangeRateController {
  constructor(
    private exchangeRateService: ExchangeRateService,
    private readonly logger: PinoLogger,
  ) {}

  @Get('get/amount')
  async getExchangeRate(@Req() req: Request) {
    try {
      const value = req.body as ExchangeRateinterface;
      this.logger.info(
        `PROCESSING REQUEST - petition for: ${JSON.stringify(value)}`,
      );
      if (value.source === value.target) {
        this.logger.error(
          `PROCESSING ERROR - Moneda de origen igual a moneda destino ${JSON.stringify(
            value,
          )}`,
        );

        return {
          data: null,
          status: 'Warning',
          message: 'Moneda de origen igual a moneda destino',
        };
      }
      return await this.exchangeRateService.getExchangeRateByAmount(
        value.source,
        value.target,
        value.amount,
      );
    } catch (error) {
      this.logger.error(`PROCESSING ERROR - error: ${error}`);
    }
  }

  @Public()
  @Get('getAll/amount/:originCurrency')
  async getAllChangeByCurrency(
    @Param('originCurrency') originCurrency: string,
  ) {
    try {
      return await this.exchangeRateService.getAllExchangeRate(originCurrency);
    } catch (error) {
      this.logger.error(`PROCESSING ERROR - error: ${error}`);
    }
  }
}
