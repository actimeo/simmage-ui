import { Routes, RouterModule } from '@angular/router';

import { CanDeactivateGuard } from '../../../guards/can-deactivate.guard';

import { DocumentComponent } from './document-form/document.component';
import { DocumentsComponent } from './documents-list/documents.component';
import { DocumentsCenterComponent } from './documents-center/documents-center.component';

import { DocumentsListResolve } from './documents-list-resolve.guard';
import { DocumentResolve } from './document-resolve.guard';

 export const documentsRoutes: Routes = [
	 {
		path: '', component: DocumentsCenterComponent, resolve: { data: DocumentsListResolve }, children: [
			{
				path: '',
				component: DocumentsComponent,
				resolve: { data: DocumentsListResolve }
			}
		]
	},
	{
		path: 'new', component: DocumentsCenterComponent, resolve: { data: DocumentsListResolve }, children: [
			{
				path: '',
				component: DocumentsComponent,
				resolve: { data: DocumentsListResolve }
			},
			{
				path: '',
				component: DocumentComponent,
				canDeactivate: [CanDeactivateGuard],
				outlet: 'details'
			}
		]
	},
	{
		path: ':id', component: DocumentsCenterComponent, resolve: { data: DocumentsListResolve }, children: [
			{
				path: '',
				component: DocumentsComponent,
				resolve: { data: DocumentsListResolve }
			},
			{
				path: '',
				component: DocumentComponent,
				resolve: { document: DocumentResolve },
				canDeactivate: [CanDeactivateGuard],
				outlet: 'details'
			}
		]
	}
 ];

 export const documentsRouting = RouterModule.forChild(documentsRoutes)