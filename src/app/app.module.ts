import { DocumentsService } from './shared/documents.service';
import { CheckboxRendererComponent } from './grid/renderers/checkbox';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { SharedModule } from './shared/shared.module';

import { MaterialModule } from '@angular/material';

import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { MainCenterComponent } from './main/main-center/main-center.component';
import { LoginComponent } from './login/login.component';

import { PgService } from './pg.service';
import { UserService } from './user.service';
import { DossiersService } from './dossiers.service';
import { DeviceService } from './device.service';
import { SnackService } from './snack.service';
import { PortalsService } from './portals.service';
import { PagesResolve } from './main/pages/pages-resolve.guard';

import { CanActivateIfLogged } from './guards/can-activate-if-logged.guard';
import { CanActivateIfUser } from './guards/can-activate-if-user.guard';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';

import { MainSidenavComponent } from './main/main-sidenav/main-sidenav.component';
import { UserinfoComponent } from './main/userinfo/userinfo.component';
import { PageComponent } from './main/page/page.component';
import { DossierIndividualComponent } from './main/dossier-individual/dossier-individual.component';
import { DossierGroupedComponent } from './main/dossier-grouped/dossier-grouped.component';
import { DocumentsComponent } from './main/pages/documents/documents.component';
import { EventsComponent } from './main/pages/events/events.component';
import { DossiersComponent } from './main/pages/dossiers/dossiers.component';
import { NotesComponent } from './main/pages/notes/notes.component';
import { ResourcesComponent } from './main/pages/resources/resources.component';
import { DocumentComponent } from './main/forms/document/document.component';

@NgModule({
  declarations: [
    // app
    AppComponent,
    LoginComponent,
    // main part
    MainCenterComponent,
    MainSidenavComponent,
    UserinfoComponent,
    PageComponent,
    DossierIndividualComponent,
    DossierGroupedComponent,
    CheckboxRendererComponent,
    DocumentsComponent,
    EventsComponent,
    DossiersComponent,
    NotesComponent,
    ResourcesComponent,
    DocumentComponent
    // Guards
    // .
  ],
  imports: [
    // ng2
    BrowserModule,
    // CommonModule,
    // ng2 modules
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    MaterialModule.forRoot(),
    // app
    routing,
    SharedModule.forRoot()
    // .
  ],
  providers: [
    PgService,
    UserService,
    DossiersService,
    DeviceService,
    SnackService,
    PortalsService,
    CanActivateIfLogged,
    CanActivateIfUser,
    CanDeactivateGuard,
    CanDeactivateGuard,
    PagesResolve,
    DocumentsService
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
