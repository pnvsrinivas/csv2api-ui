import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { Csv2apiComponent } from './modules/csv2api/csv2api.component';
import { ErrorComponent } from './shared/components/error/error.component';
import { DataComponent } from './modules/data/data.component';
import { FileResolve } from './modules/file-resolve';


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
        path: 'data/:id',
        component: DataComponent,
        resolve:{         
          fileData: FileResolve
        }  
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
  exports: [RouterModule],
  providers: [FileResolve]
})
export class AppRoutingModule { }
