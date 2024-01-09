export interface ExchangeRateResponse {
  result: Result;
  status: string;
}

export interface Result {
  updated: Date;
  source: string;
  target: string;
  value: number;
  quantity: number;
  amount: number;
}
