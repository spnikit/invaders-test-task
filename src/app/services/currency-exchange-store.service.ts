import {Injectable, signal} from '@angular/core';
import {Currency, Store} from "../models/currencies.model";

@Injectable({
  providedIn: 'root'
})
export class CurrencyExchangeStoreService {
  private _store = signal<Store>({
    currencies: {
      currency1: null,
      currency2: null
    },
    sums: {
      sum1: 0,
      sum2: 0
    },
    exchangeRate: 2
  })

  store = this._store.asReadonly()


  constructor() {
  }


  setCurrency1(currency1: Currency) {
    this._store.update(store => ({
      ...store,
      currencies: {
        ...store.currencies,
        currency1
      }
    }))
  }

  setCurrency2(currency2: Currency) {
    this._store.update(store => ({
      ...store,
      currencies: {
        ...store.currencies,
        currency2
      }
    }))
  }

  setSum1(sum1: number) {
    this._store.update(store => ({
      ...store,
      sums: {
        sum1,
        sum2: sum1 * store.exchangeRate
      }
    }))
  }

  setSum2(sum2: number) {
    this._store.update(store => ({
      ...store,
      sums: {
        sum2,
        sum1: sum2 / store.exchangeRate
      }
    }))
  }

  setExchangeRate(exchangeRate: number) {

  }
}
