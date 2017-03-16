import { AgendaComponent } from './agenda/agenda.component';
import { RelativesComponent } from './relatives/relatives.component';
import { ParticipantsComponent } from './participants/participants.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { ContactsSidenavComponent } from './contacts-sidenav/contacts-sidenav.component';
import { FrameComponent } from './../shared/frame/frame/frame.component';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const contactsRoutes: Routes = [
  {
    path: '', component: FrameComponent,
    children: [
      { path: '', component: ContactsSidenavComponent, outlet: 'sidenav' },
      {
        path: '', children: [
          { path: 'organizations', component: OrganizationsComponent },
          { path: 'participants', component: ParticipantsComponent },
          { path: 'relative', component: RelativesComponent },
          { path: 'agenda', component: AgendaComponent }
        ]
      }
    ]
  }
];

export const routing = RouterModule.forChild(contactsRoutes);
