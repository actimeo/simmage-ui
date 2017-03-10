import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../../shared/shared.module';

import { dossiersRouting } from './dossiers.routing';
import { DossiersComponent } from './dossiers.component';

import { DossiersListResolve } from './dossiers-list-resolve.guard';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    dossiersRouting
  ],
  declarations: [
    DossiersComponent
  ],
  providers: [
    DossiersListResolve
  ]
})
export class DossiersModule { }
