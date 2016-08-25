import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { MdSidenavModule } from '@angular2-material/sidenav/sidenav';
import { MdButtonModule } from '@angular2-material/button/button';
import { MdToolbarModule } from '@angular2-material/toolbar/toolbar';
import { MdIconModule } from '@angular2-material/icon/icon';
import { MdInputModule } from '@angular2-material/input/input';
import { MdCardModule } from '@angular2-material/card/card';

import { routing, appRoutingProviders } from './app.routing';

import { AdminCenterComponent } from './admin/admin-center/admin-center.component';
import { TopicsComponent } from './admin/topics/topics.component';
import { OrgansComponent } from './admin/organs/organs.component';
import { UsergroupsComponent } from './admin/usergroups/usergroups.component';
import { UsersComponent } from './admin/users/users.component';

import { AppComponent } from './app.component';
import { MainCenterComponent } from './main/main-center/main-center.component';
import { SidenavComponent } from './admin/sidenav/sidenav.component';
import { LoginComponent } from './login/login.component';

import { UserService } from './user.service';
import { PgService } from './pg.service';

import { CanActivateIfLogged } from './guards/can-activate-if-logged.guard';

@NgModule({
  declarations: [
    // app
    AppComponent,
    LoginComponent,
    // admin part
    AdminCenterComponent,
    SidenavComponent,
    TopicsComponent,
    OrgansComponent,
    UsergroupsComponent,
    UsersComponent,
    // main part
    MainCenterComponent,
    // Guards
    // .
  ],
  imports: [
    // ng2
    BrowserModule,
    CommonModule,
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
    MdSidenavModule,
    MdToolbarModule,
    // app
    routing,
    // .
  ],
  providers: [
    appRoutingProviders,
    UserService,
    PgService,
    CanActivateIfLogged
  ],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
