import { Routes } from '@angular/router';

import { UsergroupComponent } from './usergroup/usergroup.component';
import { UsergroupsComponent } from './usergroups-center/usergroups.component';
import { UsergroupsListComponent } from './usergroups-list/usergroups-list.component';

import { UsergroupResolve } from '../usergroup-resolve.guard';
import { CanDeactivateGuard } from '../../guards/can-deactivate.guard';

export const usergroupsRoutes: Routes = [];
