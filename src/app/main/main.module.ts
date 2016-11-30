import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { mainRouting } from './main.routing';

import { SharedModule } from '../shared/shared.module';

import { MainCenterComponent } from './main-center/main-center.component';
import { MainSidenavComponent } from './main-sidenav/main-sidenav.component';

import { PageComponent } from './page/page.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { DossierIndividualComponent } from './dossier-individual/dossier-individual.component';
import { DossierGroupedComponent } from './dossier-grouped/dossier-grouped.component';
import { EventsComponent } from './pages/events/events.component';
import { DossiersComponent } from './pages/dossiers/dossiers.component';
import { NotesComponent } from './pages/notes/notes.component';
import { ResourcesComponent } from './pages/resources/resources.component';

@NgModule({
	imports: [
		CommonModule,
		MaterialModule,
		mainRouting,
		SharedModule.forRoot()
	],
	declarations: [
		MainCenterComponent,
		MainSidenavComponent,
		PageComponent,
    UserinfoComponent,
    DossierIndividualComponent,
    DossierGroupedComponent,
    EventsComponent,
    DossiersComponent,
    NotesComponent,
    ResourcesComponent,
	]
})
export class MainModule {
}