import { LogisticsSidenavComponent } from './logistics-sidenav/logistics-sidenav.component';
import { LogisticsMainComponent } from './logistics-main/logistics-main.component';
import { FrameComponent } from './../shared/frame/frame/frame.component';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const logisticsRoutes: Routes = [
  {
    path: '', component: FrameComponent,
    children: [
      { path: '', component: LogisticsSidenavComponent, outlet: 'sidenav' },
      { path: '', component: LogisticsMainComponent }
    ]
  }
];

export const routing = RouterModule.forChild(logisticsRoutes);
