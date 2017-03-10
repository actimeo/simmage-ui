import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsSidenavComponent } from './contacts-sidenav/contacts-sidenav.component';
import { ContactsUserinfoComponent } from './contacts-userinfo/contacts-userinfo.component';
import { ContactsMainComponent } from './contacts-main/contacts-main.component';
import { routing } from './contacts.routing';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    routing
  ],
  declarations: [
    ContactsSidenavComponent,
    ContactsUserinfoComponent,
    ContactsMainComponent
  ]
})
export class ContactsModule { }
