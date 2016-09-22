import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { SharedModule } from './shared/shared.module';

import { MdButtonModule } from '@angular2-material/button/button';
import { MdCardModule } from '@angular2-material/card/card';
import { MdIconModule, MdIconRegistry } from '@angular2-material/icon/icon';
import { MdInputModule } from '@angular2-material/input/input';
import { MdListModule } from '@angular2-material/list/list';
import { MdRadioModule, MdUniqueSelectionDispatcher } from '@angular2-material/radio/radio';
import { MdSidenavModule } from '@angular2-material/sidenav/sidenav';
import { MdToolbarModule } from '@angular2-material/toolbar/toolbar';

import { routing, appRoutingProviders } from './app.routing';

import { AdminCenterComponent } from './admin/admin-center/admin-center.component';
import { UsergroupsComponent } from './admin/usergroups/usergroups-center/usergroups.component';
import { UsergroupsListComponent } from './admin/usergroups/usergroups-list/usergroups-list.component';
import { UsergroupComponent } from './admin/usergroups/usergroup/usergroup.component';

import { AppComponent } from './app.component';
import { MainCenterComponent } from './main/main-center/main-center.component';
import { SidenavComponent } from './admin/sidenav/sidenav.component';
import { LoginComponent } from './login/login.component';

import { PgService } from './pg.service';
import { PortalsService } from './db-services/portals.service';
import { UsergroupsService } from './db-services/usergroups.service';
import { UsergroupService } from './db-services/usergroup.service';
import { DossiersService } from './db-services/dossiers.service';

import { CanActivateIfLogged } from './guards/can-activate-if-logged.guard';
import { CanActivateIfAdmin } from './guards/can-activate-if-admin.guard';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';

import { MainSidenavComponent } from './main/main-sidenav/main-sidenav.component';
import { UserinfoComponent } from './main/userinfo/userinfo.component';
import { PageComponent } from './main/page/page.component';

@NgModule({
  declarations: [
    // app
    AppComponent,
    LoginComponent,
    // admin part
    AdminCenterComponent,
    SidenavComponent,
    UsergroupsComponent,
    // main part
    MainCenterComponent,
    MainSidenavComponent,
    UserinfoComponent,
    PageComponent,
    UsergroupsListComponent,
    UsergroupComponent
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
    // material2
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdRadioModule,
    MdSidenavModule,
    MdToolbarModule,
    // app
    routing,
    SharedModule.forRoot()
    // .
  ],
  providers: [
    MdIconRegistry,
    MdUniqueSelectionDispatcher,
    appRoutingProviders,
    PgService,
    PortalsService,
    UsergroupsService,
    DossiersService,
    CanActivateIfLogged,
    CanActivateIfAdmin,
    CanDeactivateGuard,
    UsergroupService,
    CanDeactivateGuard
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
