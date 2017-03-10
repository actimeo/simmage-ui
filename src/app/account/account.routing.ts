import { AccountSidenavComponent } from './account-sidenav/account-sidenav.component';
import { AccountUserinfoComponent } from './account-userinfo/account-userinfo.component';
import { FrameComponent } from './../shared/frame/frame/frame.component';
import { DossiersListResolve } from './dossiers/dossiers-list-resolve.guard';
import { DocumentsComponent } from './documents/documents.component';
import { EventsComponent } from './events/events.component';
import { DossiersComponent } from './dossiers/dossiers.component';
import { ProceduresComponent } from './procedures/procedures.component';
import { ProfileComponent } from './profile/profile.component';
import { NotesComponent } from './notes/notes.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ChangePasswordComponent } from './change-password/change-password.component';

export const accountRoutes: Routes = [
  {
    path: '', component: FrameComponent,
    children: [
      { path: '', component: AccountUserinfoComponent, outlet: 'userinfo' },
      { path: '', component: AccountSidenavComponent, outlet: 'sidenav' },
      {
        path: '', children: [
          { path: '' },
          { path: 'profile', component: ProfileComponent },
          { path: 'dossiers', component: DossiersComponent, resolve: { data: DossiersListResolve } },
          { path: 'events', component: EventsComponent },
          { path: 'documents', component: DocumentsComponent },
          { path: 'notes', component: NotesComponent },
          { path: 'procedures', component: ProceduresComponent },
          { path: 'changepassword', component: ChangePasswordComponent }
        ]
      }
    ]
  }
];

export const accountRouting = RouterModule.forChild(accountRoutes);
