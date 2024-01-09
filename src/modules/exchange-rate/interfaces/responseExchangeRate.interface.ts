export interface ResponseExchangeRateInterface {
  data: ResponseData;
  status: string;
}

export interface ResponseData {
  amount: number;
  amountExchangeRate: number;
  originCurrency: string;
  targetCurrency: string;
  valueExchangeRate: number;
}
