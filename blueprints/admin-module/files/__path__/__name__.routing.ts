import { Routes, RouterModule } from '@angular/router';

import { CanDeactivateGuard } from '../../guards/can-deactivate.guard';
import { <%= classifiedModuleName %>CenterComponent } from './<%= dasherizedModuleName %>-center/<%= dasherizedModuleName %>-center.component';
import { <%= classifiedModuleName %>ListComponent } from './<%= dasherizedModuleName %>-list/<%= dasherizedModuleName %>-list.component';
import { <%= classifiedModuleName %>FormComponent } from './<%= dasherizedModuleName %>-form/<%= dasherizedModuleName %>-form.component';
import { <%= classifiedModuleName %>Resolve } from './<%= dasherizedModuleName %>-resolve.guard';

export const <%= camelizedModuleName %>Routes: Routes = [
  {
    path: '', component: <%= classifiedModuleName %>CenterComponent,
    children: [
      { path: '', pathMatch: 'full', component: <%= classifiedModuleName %>ListComponent },
      { path: 'new', component: <%= classifiedModuleName %>FormComponent },
      {
        path: ':id', component: <%= classifiedModuleName %>FormComponent,
        resolve: { element: <%= classifiedModuleName %>Resolve },
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  },
];

export const <%= camelizedModuleName %>Routing = RouterModule.forChild(<%= camelizedModuleName %>Routes);
