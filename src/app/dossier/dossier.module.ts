import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DossierRoutingModule } from './dossier-routing.module';
import { DossierDetailsComponent } from './dossier-details/dossier-details.component';

@NgModule({
  imports: [
    CommonModule,
    DossierRoutingModule
  ],
  declarations: [DossierDetailsComponent]
})
export class DossierModule { }
