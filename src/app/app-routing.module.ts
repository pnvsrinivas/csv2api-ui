import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { Csv2apiComponent } from './modules/csv2api/csv2api.component';
import { ErrorComponent } from './shared/components/error/error.component';
import { DataComponent } from './modules/data/data.component';
import { FileResolve } from './modules/file-resolve';
import { StatsComponent } from './modules/stats/stats.component';


const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      // {
      //   path: '',
      //   pathMatch: 'full',
      //   redirectTo: 'upload'
      // },
      {
        path: '',
        pathMatch: 'full',
        component: Csv2apiComponent,
        data: { title: "Home" }
      },
      {
        path: 'stats/:id',
        component: StatsComponent,
        resolve:{         
          fileData: FileResolve
        },
        data: { title: "Stats" }
      },
      {
        path: 'data/:id',
        component: DataComponent,
        resolve:{         
          fileData: FileResolve
        },
        data: { title: "Data view" }
      },
      {
        path: 'error',
        component: ErrorComponent,
        data: { title: "Error" }
      },
      {
        path: 'error/:id',
        component: ErrorComponent,
        data: { title: "Error" }
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
