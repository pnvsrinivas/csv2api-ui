import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { Csv2apiComponent } from './modules/csv2api/csv2api.component';
import { ErrorComponent } from './shared/components/error/error.component';


const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'upload'
      },
      {
        path: 'upload',
        component: Csv2apiComponent
      },
      {
        path: 'error',
        component: ErrorComponent
      },
      {
        path: 'error/:id',
        component: ErrorComponent
      },
      {
        path: "**",
        pathMatch: "full",
        redirectTo: "error/404",
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
