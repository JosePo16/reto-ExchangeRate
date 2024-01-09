import { HttpService } from '@nestjs/axios';
import axios, { AxiosResponse } from 'axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';
import { ExchangeRateResponse } from './interfaces/exchangeRate.Interface';

@Injectable()
export class AxiosService {
  constructor(private readonly httpService: HttpService) {}

  async getExchangeRate(
    source: string,
    target: string,
    amount: number,
  ): Promise<ExchangeRateResponse> {
    try {
      const response = await axios.get(
        `https://api.cambio.today/v1/quotes/${source}/${target}/json?quantity=${amount}&key=45934|ZbSD26bkCVBufbj21Gx5`,
      );
      return response.data as ExchangeRateResponse;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllChangesByCurrency(source: string) {
    try {
      return this.httpService
        .get(
          `https://api.cambio.today/v1/full/${source}/json?key=45934|ZbSD26bkCVBufbj21Gx5`,
        )
        .pipe(map((response: AxiosResponse) => response.data));
    } catch (error) {
      throw console.log(
        'Error al obtener todos los tipos de cambio por moneda',
      );
    }
  }
}
