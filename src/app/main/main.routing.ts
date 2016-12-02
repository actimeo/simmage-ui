import { Routes, RouterModule } from '@angular/router';

import { MainCenterComponent } from './main-center/main-center.component';

import { CanActivateIfLogged } from '../guards/can-activate-if-logged.guard';
import { CanActivateIfUser } from '../guards/can-activate-if-user.guard';
import { CanDeactivateGuard } from '../guards/can-deactivate.guard';

export const mainRoutes: Routes = [
	{
		path: '', component: MainCenterComponent,
		canActivate: [CanActivateIfLogged, CanActivateIfUser],
		children: [
			{ path: '' },
			{ path: ':viewid',
				children: [
					{ path: '' },
					{ path: 'documents', loadChildren: 'app/main/pages/documents/documents.module#DocumentsModule' },
					/*{ path: 'dossiers' },
					{ path: 'events' },
					{ path: 'notes' },
					{ path: 'resources' }*/
				]
			}
		]
	}
];

export const mainRouting = RouterModule.forChild(mainRoutes);