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
					{ path: 'documents', 	loadChildren: 'app/main/pages/documents/documents.module#DocumentsModule' },
					{ path: 'events', 		loadChildren: 'app/main/pages/events/events.module#EventsModule' },
					{ path: 'lists', 		loadChildren: 'app/main/pages/dossiers/dossiers.module#DossiersModule' },
					{ path: 'notes', 		loadChildren: 'app/main/pages/notes/notes.module#NotesModule' },
					{ path: 'resources', 	loadChildren: 'app/main/pages/resources/resources.module#ResourcesModule' },
					{ path: 'objectives',	loadChildren: 'app/main/pages/objectives/objectives.module#ObjectivesModule' }
				]
			}
		]
	}
];

export const mainRouting = RouterModule.forChild(mainRoutes);