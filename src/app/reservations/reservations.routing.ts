import { ReservationsUserinfoComponent } from './reservations-userinfo/reservations-userinfo.component';
import { ReservationsMainComponent } from './reservations-main/reservations-main.component';
import { ReservationsSidenavComponent } from './reservations-sidenav/reservations-sidenav.component';
import { FrameComponent } from './../shared/frame/frame/frame.component';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const reservationsRoutes: Routes = [
  {
    path: '', component: FrameComponent,
    children: [
      { path: '', component: ReservationsUserinfoComponent, outlet: 'userinfo' },
      { path: '', component: ReservationsSidenavComponent, outlet: 'sidenav' },
      { path: '', component: ReservationsMainComponent }
    ]
  }
];

export const routing = RouterModule.forChild(reservationsRoutes);
