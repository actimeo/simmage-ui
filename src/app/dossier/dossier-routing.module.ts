import { DossierEventComponent } from './dossier-event/dossier-event.component';
import { DossierDocumentComponent } from './dossier-document/dossier-document.component';
import { DossierResolverService } from './dossier-resolver.service';
import { DossierDetailsCanActivateGuard } from './dossier-details-can-activate.guard';
import { DossierDetailsComponent } from './dossier-details/dossier-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: ':id',
    component: DossierDetailsComponent,
    canActivate: [DossierDetailsCanActivateGuard],
    resolve: { data: DossierResolverService },
    children: [
      {
        path: '', children: [
          { path: '' },
          {
            path: ':viewid', children: [
              { path: '' },
              { path: 'documents', component: DossierDocumentComponent/*, resolve: { data: DocumentsListResolve }*/ },
              { path: 'events', component: DossierEventComponent /*, resolve: { data: EventsListResolve }*/ },
/*              { path: 'lists', loadChildren: 'app/main/pages/dossiers/dossiers.module#DossiersModule' },*/
/*              { path: 'notes', component: NotesComponent, resolve: { data: NotesListResolve } },
              { path: 'resources', loadChildren: 'app/main/pages/resources/resources.module#ResourcesModule' },
              { path: 'objectives', component: ObjectivesComponent, resolve: { data: ObjectivesListResolve } }*/
            ]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DossierRoutingModule { }
