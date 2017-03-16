import { OccupancyComponent } from './occupancy/occupancy.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { LogisticsSidenavComponent } from './logistics-sidenav/logistics-sidenav.component';
import { FrameComponent } from './../shared/frame/frame/frame.component';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const logisticsRoutes: Routes = [
  {
    path: '', component: FrameComponent,
    children: [
      { path: '', component: LogisticsSidenavComponent, outlet: 'sidenav' },
      {
        path: '', children: [
          { path: '' },
          { path: 'reservations', component: ReservationsComponent },
          { path: 'occupancy', component: OccupancyComponent }
        ]
      }
    ]
  }
];

export const routing = RouterModule.forChild(logisticsRoutes);
