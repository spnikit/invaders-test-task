import {Component, DestroyRef} from '@angular/core';
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {CURRENCIES_LIST} from "../../models/currencies.model";
import {CurrencyExchangeStoreService} from "../../services/currency-exchange-store.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'inv-main',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  currencies = CURRENCIES_LIST

  form = this._fb.group({
    baseCurrency: [this._storeService.store().currencies.baseCurrency],
    targetCurrency: [this._storeService.store().currencies.targetCurrency],
    baseSum: new FormControl(this._storeService.store().sums.baseSum, {nonNullable: true}),
    targetSum: new FormControl(this._storeService.store().sums.targetSum, {nonNullable: true}),
  })

  constructor(
    private _fb: FormBuilder,
    private _storeService: CurrencyExchangeStoreService,
    private destroyRef: DestroyRef
  ) {
    this.form.controls.baseSum.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((sum1) => {
      this._storeService.setBaseSum(+sum1)
      this.form.controls.targetSum.setValue(this._storeService.store().sums.targetSum, {emitEvent: false})
    })

    this.form.controls.targetSum.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((sum2) => {
      this._storeService.setTargetSum(+sum2)
      this.form.controls.baseSum.setValue(this._storeService.store().sums.baseSum, {emitEvent: false})
    })

    this.form.controls.baseCurrency.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(baseCurrency => {
      if (baseCurrency) {
        this._storeService.setBaseCurrency(baseCurrency)
      }
    })

    this.form.controls.targetCurrency.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(targetCurrency => {
      if (targetCurrency) {
        this._storeService.setTargetCurrency(targetCurrency)
        this.form.controls.targetSum.setValue(this._storeService.store().sums.targetSum, {emitEvent: false})
      }
    })

  }
}

/*
* - one generic component for 2 inputs with select
*
* */
