import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdSidenavModule } from '@angular2-material/sidenav/sidenav';
import { MdButtonModule } from '@angular2-material/button/button';
import { MdToolbarModule } from '@angular2-material/toolbar/toolbar';
import { MdIconModule } from '@angular2-material/icon/icon';

import { routing, appRoutingProviders } from './app.routing';

import { AdminCenterComponent } from './admin/admin-center/admin-center.component';
import { TopicsComponent } from './admin/topics/topics.component';
import { OrgansComponent } from './admin/organs/organs.component';
import { UsergroupsComponent } from './admin/usergroups/usergroups.component';
import { UsersComponent } from './admin/users/users.component';

import { AppComponent } from './app.component';
import { MainCenterComponent } from './main/main-center/main-center.component';
import { SidenavComponent } from './admin/sidenav/sidenav.component';

@NgModule({
  declarations: [
    AppComponent,
    MainCenterComponent,
    AdminCenterComponent,
    TopicsComponent,
    OrgansComponent,
    UsergroupsComponent,
    UsersComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    routing,
    MdSidenavModule,
    MdButtonModule,
    MdToolbarModule,
    MdIconModule
  ],
  providers: [appRoutingProviders],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
