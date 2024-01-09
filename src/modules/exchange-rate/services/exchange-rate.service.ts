import { Inject, Injectable } from '@nestjs/common';
import { AxiosService } from 'src/shared/axios/axios.service';
import {
  ResponseData,
  ResponseExchangeRateInterface,
} from '../interfaces/responseExchangeRate.interface';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ExchangeRateService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private axiosService: AxiosService,
  ) {}

  getExchangeRateByAmount = async (
    source: string,
    target: string,
    amount: number,
  ) => {
    const { result } = await this.axiosService.getExchangeRate(
      source,
      target,
      amount,
    );

    const data: ResponseData = {
      amount: result.quantity,
      amountExchangeRate: result.amount,
      originCurrency: result.source,
      targetCurrency: result.target,
      valueExchangeRate: result.value,
    };

    const response: ResponseExchangeRateInterface = {
      data: data,
      status: 'OK',
    };

    return response;
  };

  getAllExchangeRate = async (source: string) => {
    const cacheItem = await this.cacheManager.get(source);
    if (!cacheItem) {
      const response = await this.axiosService.getAllChangesByCurrency(source);
      await this.cacheManager.set(source, response, 60);
      return response;
    }
    return cacheItem;
  };
}
