import { ContactsUserinfoComponent } from './contacts-userinfo/contacts-userinfo.component';
import { ContactsMainComponent } from './contacts-main/contacts-main.component';
import { ContactsSidenavComponent } from './contacts-sidenav/contacts-sidenav.component';
import { FrameComponent } from './../shared/frame/frame/frame.component';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const contactsRoutes: Routes = [
  {
    path: '', component: FrameComponent,
    children: [
      { path: '', component: ContactsUserinfoComponent, outlet: 'userinfo' },
      { path: '', component: ContactsSidenavComponent, outlet: 'sidenav' },
      { path: '', component: ContactsMainComponent }
    ]
  }
];

export const routing = RouterModule.forChild(contactsRoutes);
