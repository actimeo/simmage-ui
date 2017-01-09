import { DossiersListResolve } from './dossiers/dossiers-list-resolve.guard';
import { DocumentsComponent } from './documents/documents.component';
import { EventsComponent } from './events/events.component';
import { DossiersComponent } from './dossiers/dossiers.component';
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
      { path: 'profile',    component: ProfileComponent },
      { path: 'dossiers',   component: DossiersComponent, resolve: { data: DossiersListResolve } },
      { path: 'events',     component: EventsComponent },
      { path: 'documents',  component: DocumentsComponent },
      { path: 'notes',      component: NotesComponent },
      { path: 'procedures', component: ProceduresComponent }
    ]
  }
];

export const accountRouting = RouterModule.forChild(accountRoutes);
