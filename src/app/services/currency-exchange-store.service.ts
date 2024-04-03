import {Injectable, signal} from '@angular/core';
import {CURRENCIES, CURRENCIES_LIST, Currency, Store} from "../models/currencies.model";
import {CurrencyApiService} from "./currency-api.service";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CurrencyExchangeStoreService {
  private _store = signal<Store>({
    currencies: {
      baseCurrency: CURRENCIES_LIST[1],
      targetCurrency: CURRENCIES_LIST[2]
    },
    sums: {
      baseSum: 0,
      targetSum: 0
    },
    exchangeRate: 1
  })

  store = this._store.asReadonly()


  constructor(private _apiService: CurrencyApiService) {
  }


  async getRates(baseCurrency: CURRENCIES) {
    const ratesResponse = await firstValueFrom(this._apiService.getRates(baseCurrency))
    this._store.update(store => {
      if (store.currencies.targetCurrency) {
        return {
          ...store,
          rates: ratesResponse.rates,
          exchangeRate: +ratesResponse.rates[store.currencies.targetCurrency.val]
        }

      }
      return {
        ...store,
        rates: ratesResponse.rates,
      }

    })
  }


  setTargetRate(targetCurrency: CURRENCIES) {

    this._store.update(store => {

      if (store.rates) {
        return {
          ...store,
          exchangeRate: +store.rates[targetCurrency],
          sums: {
            ...store.sums,
            targetSum: store.sums.baseSum *  +store.rates[targetCurrency]
          }
        }
      }
      return store

    })
  }

  setBaseCurrency(baseCurrency: Currency) {
    this._store.update(store => ({
      ...store,
      currencies: {
        ...store.currencies,
        baseCurrency
      }
    }))
    this.getRates(baseCurrency.val);
  }

  setTargetCurrency(targetCurrency: Currency) {

    this._store.update(store => ({
      ...store,
      currencies: {
        ...store.currencies,
        targetCurrency
      }
    }))

    this.setTargetRate(targetCurrency.val)
  }

  setBaseSum(baseSum: number) {
    this._store.update(store => ({
      ...store,
      sums: {
        baseSum,
        targetSum: baseSum * store.exchangeRate
      }
    }))

  }

  setTargetSum(targetSum: number) {
    this._store.update(store => ({
      ...store,
      sums: {
        targetSum,
        baseSum: targetSum / store.exchangeRate
      }
    }))

  }
}
