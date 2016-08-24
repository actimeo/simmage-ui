import { Routes, RouterModule } from '@angular/router';

import { AdminCenterComponent } from './admin/admin-center/admin-center.component';
import { MainCenterComponent } from './main/main-center/main-center.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: MainCenterComponent },
  { path: 'admin', component: AdminCenterComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);
