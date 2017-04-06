import { DossierResolverService } from './dossier-resolver.service';
import { DossierDetailsCanActivateGuard } from './dossier-details-can-activate.guard';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DossierRoutingModule } from './dossier-routing.module';
import { DossierDetailsComponent } from './dossier-details/dossier-details.component';
import { DossierSidenavComponent } from './dossier-sidenav/dossier-sidenav.component';
import { DossierDocumentComponent } from './dossier-document/dossier-document.component';
import { DossierEventComponent } from './dossier-event/dossier-event.component';
import { DossierNoteComponent } from './dossier-note/dossier-note.component';

@NgModule({
  imports: [
    CommonModule,
    DossierRoutingModule,
    MaterialModule
  ],
  declarations: [
    DossierDetailsComponent,
    DossierSidenavComponent,
    DossierDocumentComponent,
    DossierEventComponent,
    DossierNoteComponent
  ],
  providers: [
    DossierDetailsCanActivateGuard,
    DossierResolverService
  ]
})
export class DossierModule { }
