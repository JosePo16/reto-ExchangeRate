import { Module } from '@nestjs/common';
import { ExchangeRateService } from './services/exchange-rate.service';
import { ExchangeRateController } from './controllers/exchange-rate.controller';
import { AxiosModule } from 'src/shared/axios/axios.module';

@Module({
  imports: [AxiosModule],
  providers: [ExchangeRateService],
  controllers: [ExchangeRateController],
})
export class ExchangeRateModule {}
