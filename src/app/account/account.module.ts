import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { accountRouting } from './account.routing';
import { AccountCenterComponent } from './account-center/account-center.component';
import { AccountSidenavComponent } from './account-sidenav/account-sidenav.component';
import { MaterialModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';
import { NotesComponent } from './notes/notes.component';
import { ProfileComponent } from './profile/profile.component';
import { ProceduresComponent } from './procedures/procedures.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule.forRoot(),
    accountRouting
  ],
  declarations: [
    AccountComponent,
    AccountCenterComponent,
    AccountSidenavComponent,
    NotesComponent,
    ProfileComponent,
    ProceduresComponent
  ]
})
export class AccountModule { }
