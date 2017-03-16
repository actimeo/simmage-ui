import { MaterialModule } from '@angular/material';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsSidenavComponent } from './contacts-sidenav/contacts-sidenav.component';
import { routing } from './contacts.routing';
import { OrganizationsComponent } from './organizations/organizations.component';
import { ParticipantsComponent } from './participants/participants.component';
import { RelativesComponent } from './relatives/relatives.component';
import { AgendaComponent } from './agenda/agenda.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    routing
  ],
  declarations: [
    ContactsSidenavComponent,
    OrganizationsComponent,
    ParticipantsComponent,
    RelativesComponent,
    AgendaComponent
  ]
})
export class ContactsModule { }
