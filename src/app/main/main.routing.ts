import { MainSidenavComponent } from './main-sidenav/main-sidenav.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { FrameComponent } from './../shared/frame/frame/frame.component';
import { RouterModule, Routes } from '@angular/router';

import { CanActivateIfLogged } from '../services/guards/can-activate-if-logged.guard';
import { CanActivateIfUser } from '../services/guards/can-activate-if-user.guard';
import { CanDeactivateGuard } from '../services/guards/can-deactivate.guard';
import { ModuleWithProviders } from '@angular/core';

import { DocumentsComponent } from './pages/documents/documents.component';
import { DocumentsListResolve } from './pages/documents/documents-list-resolve.guard';

import { NotesComponent } from './pages/notes/notes.component';
import { NotesListResolve } from './pages/notes/notes-list-resolve.guard';

import { EventsComponent } from './pages/events/events.component';
import { EventsListResolve } from './pages/events/events-list-resolve.guard';

import { ObjectivesComponent } from './pages/objectives/objectives.component';
import { ObjectivesListResolve } from './pages/objectives/objectives-list-resolve.guard';

export const mainRoutes: Routes = [
  {

    path: '', component: FrameComponent,
    canActivate: [CanActivateIfLogged, CanActivateIfUser],
    children: [
      { path: '', component: UserinfoComponent, outlet: 'userinfo' },
      { path: '', component: MainSidenavComponent, outlet: 'sidenav' },
      {
        path: '', children: [
          { path: '' },
          {
            path: ':viewid', children: [
              { path: '' },
              { path: 'documents', component: DocumentsComponent, resolve: { data: DocumentsListResolve } },
              { path: 'events', component: EventsComponent, resolve: { data: EventsListResolve } },
              { path: 'lists', loadChildren: 'app/main/pages/dossiers/dossiers.module#DossiersModule' },
              { path: 'notes', component: NotesComponent, resolve: { data: NotesListResolve } },
              { path: 'resources', loadChildren: 'app/main/pages/resources/resources.module#ResourcesModule' },
              { path: 'objectives', component: ObjectivesComponent, resolve: { data: ObjectivesListResolve } }
            ]
          }
        ]
      }
    ]
  }
];

export const mainRouting = RouterModule.forChild(mainRoutes);
