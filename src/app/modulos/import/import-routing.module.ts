import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ImportComponent} from "./import.component";
import {ImportHomeComponent} from "./views/import-home/import-home.component";

const routes: Routes = [
  {
    path: '',
    component: ImportComponent,
    children: [
      {
        path: '',
        component: ImportHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportRoutingModule { }
