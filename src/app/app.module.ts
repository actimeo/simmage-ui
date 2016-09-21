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
import { UsersComponent } from './admin/users/users.component';

import { AppComponent } from './app.component';
import { MainCenterComponent } from './main/main-center/main-center.component';
import { SidenavComponent } from './admin/sidenav/sidenav.component';
import { LoginComponent } from './login/login.component';

import { OrgansService } from './db-services/organs.service';
import { OrganService } from './db-services/organ.service';
import { OrganResolve } from './admin/organ-resolve.guard';
import { PgService } from './pg.service';
import { PortalsService } from './db-services/portals.service';
import { TopicService } from './db-services/topic.service';
import { TopicsService } from './db-services/topics.service';
import { TopicResolve } from './admin/topic-resolve.guard';
import { UsergroupsService } from './db-services/usergroups.service';
import { UsersService } from './db-services/users.service';
import { DossiersService } from './db-services/dossiers.service';

import { CanActivateIfLogged } from './guards/can-activate-if-logged.guard';
import { CanActivateIfAdmin } from './guards/can-activate-if-admin.guard';
import { CanDeactivateGuard } from './guards/can-deactivate.guard';

import { MainSidenavComponent } from './main/main-sidenav/main-sidenav.component';
import { UserinfoComponent } from './main/userinfo/userinfo.component';
import { PageComponent } from './main/page/page.component';

import { OrgansComponent } from './admin/organs/organs-center/organs.component';
import { OrganComponent } from './admin/organs/organ/organ.component';
import { OrgansListComponent } from './admin/organs/organs-list/organs-list.component';

@NgModule({
  declarations: [
    // app
    AppComponent,
    LoginComponent,
    // admin part
    AdminCenterComponent,
    SidenavComponent,
    OrgansComponent,
    UsergroupsComponent,
    UsersComponent,
    // main part
    MainCenterComponent,
    MainSidenavComponent,
    UserinfoComponent,
    PageComponent,
    OrganComponent,
    OrgansListComponent,
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
    OrgansService,
    OrganService,
    OrganResolve,
    PgService,
    PortalsService,
    TopicService,
    TopicsService,
    UsergroupsService,
    UsersService,
    DossiersService,
    CanActivateIfLogged,
    CanActivateIfAdmin,
    CanDeactivateGuard,
    TopicResolve
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
