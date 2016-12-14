import { ProceduresComponent } from './procedures/procedures.component';
import { ProfileComponent } from './profile/profile.component';
import { NotesComponent } from './notes/notes.component';
import { AccountCenterComponent } from './account-center/account-center.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const accountRoutes: Routes = [
  {
    path: '', component: AccountCenterComponent,
    children: [
      { path: '' },
      { path: 'notes', component: NotesComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'procedures', component: ProceduresComponent }
    ]
  }
];

export const accountRouting = RouterModule.forChild(accountRoutes);
