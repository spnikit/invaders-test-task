import {CURRENCIES_LIST, Currency, Rates} from "../models/currencies.model";
import {patchState, signalStore, withComputed, withMethods, withState} from "@ngrx/signals";
import {computed, inject} from "@angular/core";
import {CurrencyApiService} from "../services/currency-api.service";
import {debounceTime, firstValueFrom, pipe, tap} from "rxjs";
import {rxMethod} from "@ngrx/signals/rxjs-interop";

interface State {
  currencies: {
    baseCurrency: Currency;
    targetCurrency: Currency;
  },
  sums: {
    baseSum: number;
    targetSum: number;
  }
  rates: Rates;
  exchangeRate: number;
}


const initialState: State = {

  currencies: {
    baseCurrency: CURRENCIES_LIST[1],
    targetCurrency: CURRENCIES_LIST[2]
  },
  sums: {
    baseSum: 0,
    targetSum: 0
  },
  rates: {} as Rates,
  exchangeRate: 1

}

export const CurrencyExchangeStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withComputed(({exchangeRate, sums, rates, currencies}) => ({
    baseSumComputed: computed(() => sums.targetSum() / exchangeRate()),
    targetSumComputed: computed(() => sums.baseSum() * exchangeRate())
  })),
  withMethods((store, apiService = inject(CurrencyApiService)) => ({
    setBaseSum(baseSum: number) {
      patchState(store, (state) => ({
        sums: {
          ...state.sums,
          baseSum
        }
      }))
    },

    setBaseSumRx: rxMethod<number>(
      pipe(
        debounceTime(100),
        tap(baseSum => {
          patchState(store, (state) => ({
            sums: {
              ...state.sums,
              baseSum
            }
          }))

        })
      )
    ),
    setTargetSum(targetSum: number) {
      patchState(store, (state) => ({
        sums: {
          ...state.sums,
          targetSum
        }
      }))
    },
    setTargetSumRx: rxMethod<number>(
      pipe(
        debounceTime(100),
        tap(targetSum => {
          patchState(store, (state) => ({
            sums: {
              ...state.sums,
              targetSum,
            }
          }))

        })
      )
    ),
    async getRates(baseCurrency: Currency = CURRENCIES_LIST[1]) {
      const ratesResponse = await firstValueFrom(apiService.getRates(baseCurrency.val))
      patchState(store, (state) => ({
        rates: ratesResponse.rates,
        exchangeRate: +ratesResponse.rates[state.currencies.targetCurrency.val]
      }))
    },

    setTargetCurrency(targetCurrency: Currency) {
      patchState(store, (state) => ({
        sums: {
          ...state.sums,
        },
        currencies: {
          ...state.currencies,
          targetCurrency,
        },
        exchangeRate: +state.rates[targetCurrency.val]
      }))
    }
  }))
)
