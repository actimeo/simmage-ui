import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from '../../services/guards/can-deactivate.guard';
import { ModuleWithProviders } from '@angular/core';
import { UserComponent } from './user/user.component';
import { UserResolve } from './user-resolve.guard';
import { UsersComponent } from './users-center/users.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersListResolve } from './users-list-resolve.guard';

export const usersRoutes: Routes = [
  {
    path: '', component: UsersComponent,
    children: [
      { path: '',
        pathMatch: 'full',
        component: UsersListComponent,
        resolve: { list: UsersListResolve }
      },
      { path: 'new',
        component: UserComponent
      },
      {
        path: ':login', component: UserComponent,
        resolve: { user: UserResolve, list: UsersListResolve },
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }];

export const usersRouting = RouterModule.forChild(usersRoutes);
