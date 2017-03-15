import { DossierDetailsCanActivateGuard } from './dossier-details-can-activate.guard';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DossierRoutingModule } from './dossier-routing.module';
import { DossierDetailsComponent } from './dossier-details/dossier-details.component';

@NgModule({
  imports: [
    CommonModule,
    DossierRoutingModule,
    MaterialModule
  ],
  declarations: [
    DossierDetailsComponent
  ],
  providers: [
    DossierDetailsCanActivateGuard
  ]
})
export class DossierModule { }
