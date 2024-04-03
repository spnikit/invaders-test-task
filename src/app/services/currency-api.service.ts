import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CURRENCIES, CurrencyApiResponse} from "../models/currencies.model";
import {Observable} from "rxjs";

const API_KEY = '1a936d0e05a84524b785d4ab3a0a57f3';
const ENDPOINT = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${API_KEY}&symbols=USD,GBP,EUR,RUB&base=`

@Injectable({
  providedIn: 'root'
})
export class CurrencyApiService {

  constructor(
    private _http: HttpClient
  ) {
  }

  getRates(baseCurrency: CURRENCIES = CURRENCIES.USD): Observable<CurrencyApiResponse> {
    return this._http.get<CurrencyApiResponse>(`${ENDPOINT}${baseCurrency}`)
  }
}
