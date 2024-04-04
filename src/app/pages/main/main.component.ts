import {Component, effect, inject} from '@angular/core';
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {CURRENCIES_LIST} from "../../models/currencies.model";
import {CurrencyExchangeStore} from "../../store/currency-exchange.store";
import {toSignal} from "@angular/core/rxjs-interop";
import {debounceTime} from "rxjs";

@Component({
  selector: 'inv-main',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  currencies = CURRENCIES_LIST
  store = inject(CurrencyExchangeStore)

  form = this._fb.nonNullable.group({
    baseCurrency: [this.store.currencies.baseCurrency()],
    targetCurrency: [this.store.currencies.targetCurrency()],
    baseSum: [this.store.baseSumComputed()],
    targetSum: [this.store.targetSumComputed()],
  })

  baseSumSignal = toSignal(this.form.controls.baseSum.valueChanges.pipe(debounceTime(100)))
  targetSumSignal = toSignal(this.form.controls.targetSum.valueChanges.pipe(debounceTime(100)))
  baseCurrency = toSignal(this.form.controls.baseCurrency.valueChanges)
  targetCurrency = toSignal(this.form.controls.targetCurrency.valueChanges)

  constructor(
    private _fb: FormBuilder,
  ) {
    effect(() => {
      const baseSum = this.baseSumSignal();
      if (baseSum !== null && baseSum !== undefined) {
        this.store.setBaseSum(baseSum);
        this.form.controls.targetSum.setValue(this.store.targetSumComputed(), {emitEvent: false});
      }
    }, {allowSignalWrites: true});

    effect(() => {
      const targetSum = this.targetSumSignal();
      if (targetSum !== null && targetSum !== undefined) {
        this.store.setTargetSum(targetSum);
        this.form.controls.baseSum.setValue(this.store.baseSumComputed(), {emitEvent: false});
      }
    }, {allowSignalWrites: true});

    effect(() => {
      const targetCurrency = this.targetCurrency();
      if (targetCurrency) {
        this.store.setTargetCurrency(targetCurrency);
        // this.form.controls.targetCurrency.setValue(targetCurrency, {emitEvent: false});
      }
    }, {allowSignalWrites: true});


  }
}


