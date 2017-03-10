import { SidenavComponent } from './sidenav/sidenav.component';
import { FrameComponent } from './../shared/frame/frame/frame.component';
import { RouterModule, Routes } from '@angular/router';

import { CanActivateIfAdmin } from './can-activate-if-admin.guard';
import { CanActivateIfLogged } from '../services/guards/can-activate-if-logged.guard';
import { ModuleWithProviders } from '@angular/core';

export const adminRoutes: Routes = [
  {
    path: '', component: FrameComponent,
    canActivate: [CanActivateIfLogged, CanActivateIfAdmin],
    children: [
      { path: '', component: SidenavComponent, outlet: 'sidenav' },
      {
        path: '',
        children: [
          { path: '' },
          { path: 'topics', loadChildren: 'app/admin/topics/topics.module#TopicsModule' },
          { path: 'portals', loadChildren: 'app/admin/portals/portals.module#PortalsModule' },
          { path: 'organs', loadChildren: 'app/admin/organs/organs.module#OrgansModule' },
          { path: 'groups', loadChildren: 'app/admin/groups/groups.module#GroupsModule' },

          { path: 'events-types', loadChildren: 'app/admin/events-types/events-types.module#EventsTypesModule' },
          { path: 'documents-types', loadChildren: 'app/admin/documents-types/documents-types.module#DocumentsTypesModule' },

          { path: 'usergroups', loadChildren: 'app/admin/usergroups/usergroups.module#UsergroupsModule' },
          { path: 'users', loadChildren: 'app/admin/users/users.module#UsersModule' },

          { path: 'events-views', loadChildren: 'app/admin/events-views/events-views.module#EventsViewsModule' },
          { path: 'documents-views', loadChildren: 'app/admin/documents-views/documents-views.module#DocumentsViewsModule' },
          { path: 'notes-views', loadChildren: 'app/admin/notes-views/notes-views.module#NotesViewsModule' },
          { path: 'resources-views', loadChildren: 'app/admin/resources-views/resources-views.module#ResourcesViewsModule' },
          { path: 'objectives-views', loadChildren: 'app/admin/objectives-views/objectives-views.module#ObjectivesViewsModule' },
          { path: 'lists-views', loadChildren: 'app/admin/lists-views/lists-views.module#ListsViewsModule' },
        ]
      }
    ]
  }
];

export const adminRouting = RouterModule.forChild(adminRoutes);
