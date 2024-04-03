import {Component} from '@angular/core';
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {CURRENCIES_LIST} from "../../models/currencies.model";

@Component({
  selector: 'inv-main',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  currencies = CURRENCIES_LIST
  selectControl = new FormControl(this.currencies[0])
}

/*
* - one generic component for 2 inputs with select
*
* */
