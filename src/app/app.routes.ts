import {Routes} from '@angular/router';
import {HttpClient} from "@angular/common/http";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/main/main.component').then(m => m.MainComponent),
  },
  {
    path: '**',
    redirectTo: ''
  }
];
