import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportRoutingModule } from './import-routing.module';
import { ImportComponent } from './import.component';
import { ImportHomeComponent } from './views/import-home/import-home.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ImportComponent,
    ImportHomeComponent
  ],
  imports: [
    CommonModule,
    ImportRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ImportModule { }
