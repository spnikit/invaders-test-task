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


export const CURRENCIES_LIST: { val: CURRENCIES, icon: CURRENCY_ICONS }[] = [
  {val: CURRENCIES.EUR, icon: CURRENCY_ICONS.EUR},
  {val: CURRENCIES.USD, icon: CURRENCY_ICONS.USD},
  {val: CURRENCIES.RUB, icon: CURRENCY_ICONS.RUB},
  {val: CURRENCIES.GBP, icon: CURRENCY_ICONS.GBP},
]
