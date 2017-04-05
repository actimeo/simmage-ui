import { DossierResolverService } from './dossier-resolver.service';
import { DossierDetailsCanActivateGuard } from './dossier-details-can-activate.guard';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DossierRoutingModule } from './dossier-routing.module';
import { DossierDetailsComponent } from './dossier-details/dossier-details.component';
import { DossierDetailsIndividualComponent } from './dossier-details-individual/dossier-details-individual.component';
import { DossierDetailsGroupedComponent } from './dossier-details-grouped/dossier-details-grouped.component';

@NgModule({
  imports: [
    CommonModule,
    DossierRoutingModule,
    MaterialModule
  ],
  declarations: [
    DossierDetailsComponent,
    DossierDetailsIndividualComponent,
    DossierDetailsGroupedComponent
  ],
  providers: [
    DossierDetailsCanActivateGuard,
    DossierResolverService
  ]
})
export class DossierModule { }
