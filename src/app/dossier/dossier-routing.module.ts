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
    resolve: { data: DossierResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class DossierRoutingModule { }
