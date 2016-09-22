import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users-center/users.component';

export const usersRoutes: Routes = [
    { path: '', component: UsersComponent }
];

export const usersRouting = RouterModule.forChild(usersRoutes);
