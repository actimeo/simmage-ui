import { Routes, RouterModule } from '@angular/router';

import { OrgansComponent } from './organs-center/organs.component';
import { OrganComponent } from './organ/organ.component';
import { OrgansListComponent } from './organs-list/organs-list.component';

import { OrganResolve } from './organ-resolve.guard';
import { CanDeactivateGuard } from '../../guards/can-deactivate.guard';

export const organsRoutes: Routes = [
  {
    path: '', component: OrgansComponent,
    children: [
      { path: '', pathMatch: 'full', component: OrgansListComponent },
      { path: 'new', component: OrganComponent },
      {
        path: ':id', component: OrganComponent,
        resolve: { organ: OrganResolve },
        canDeactivate: [CanDeactivateGuard]
      },
    ]
  },
];

export const organsRouting = RouterModule.forChild(organsRoutes);
