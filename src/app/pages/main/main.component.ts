import {Component, DestroyRef, effect} from '@angular/core';
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
    currency1: [this._storeService.store().currencies.currency1],
    currency2: [this._storeService.store().currencies.currency2],
    sum1: new FormControl(this._storeService.store().sums.sum1, {nonNullable: true}),
    sum2: new FormControl(this._storeService.store().sums.sum2, {nonNullable: true}),
  })

  constructor(
    private _fb: FormBuilder,
    private _storeService: CurrencyExchangeStoreService,
    private destroyRef: DestroyRef
  ) {
    this.form.controls.sum1.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((sum1) => {
      this._storeService.setSum1(+sum1)
      this.form.controls.sum2.setValue(this._storeService.store().sums.sum2, {emitEvent: false})
    })

    this.form.controls.sum2.valueChanges.pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe((sum2) => {
      this._storeService.setSum2(+sum2)
      this.form.controls.sum1.setValue(this._storeService.store().sums.sum1, {emitEvent: false})
    })
  }
}

/*
* - one generic component for 2 inputs with select
*
* */
