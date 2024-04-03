export enum CURRENCIES {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  RUB = 'RUB',
}

export enum CURRENCY_ICONS {
  EUR = 'euro_symbol',
  USD = 'attach_money',
  GBP = 'currency_pound',
  RUB = 'currency_ruble'
}

export interface Currency {
  val: CURRENCIES;
  icon: CURRENCY_ICONS;
}

export const CURRENCIES_LIST: Currency[] = [
  {val: CURRENCIES.EUR, icon: CURRENCY_ICONS.EUR},
  {val: CURRENCIES.USD, icon: CURRENCY_ICONS.USD},
  {val: CURRENCIES.RUB, icon: CURRENCY_ICONS.RUB},
  {val: CURRENCIES.GBP, icon: CURRENCY_ICONS.GBP},
]



export interface Store {
  currencies: {
    currency1: Currency | null;
    currency2: Currency | null;
  },
  sums: {
    sum1: number;
    sum2: number;
  }
  exchangeRate: number;
}

/*
*
* currency1
* currency2
*
* sum1
* sum2
*
* exchangeRate
* */
