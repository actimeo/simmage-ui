import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from '../../services/guards/can-deactivate.guard';
import { ListsViewsCenterComponent } from './lists-views-center/lists-views-center.component';
import { ListsViewsFormComponent } from './lists-views-form/lists-views-form.component';
import { ListsViewsListComponent } from './lists-views-list/lists-views-list.component';
import { ListsViewsListResolve } from './lists-views-list-resolve.guard';
import { ListsViewsResolve } from './lists-views-resolve.guard';
import { ModuleWithProviders } from '@angular/core';

export const listsViewsRoutes: Routes = [
  {
    path: '', component: ListsViewsCenterComponent, children: [
      {
        path: '',
        component: ListsViewsListComponent,
        resolve: { list: ListsViewsListResolve }
      }
    ]
  },
  {
    path: 'new', component: ListsViewsCenterComponent, children: [
      {
        path: '',
        component: ListsViewsListComponent,
        resolve: { list: ListsViewsListResolve }
      },
      {
        path: '',
        component: ListsViewsFormComponent,
        canDeactivate: [CanDeactivateGuard],
        outlet: 'details'
      }
    ]
  },
  {
    path: ':id', component: ListsViewsCenterComponent, children: [
      {
        path: '',
        component: ListsViewsListComponent,
        resolve: { list: ListsViewsListResolve }
      },
      {
        path: '',
        component: ListsViewsFormComponent,
        resolve: { listsViews: ListsViewsResolve },
  canDeactivate: [CanDeactivateGuard],
  outlet: 'details'
      }
]
  }
];

export const listsViewsRouting = RouterModule.forChild(listsViewsRoutes);
