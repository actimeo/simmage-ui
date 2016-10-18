import { Routes, RouterModule } from '@angular/router';

import { CanDeactivateGuard } from '../../guards/can-deactivate.guard';
import { <%= classifiedModuleName %>CenterComponent } from './<%= dasherizedModuleName %>-center/<%= dasherizedModuleName %>-center.component';
import { <%= classifiedModuleName %>ListComponent } from './<%= dasherizedModuleName %>-list/<%= dasherizedModuleName %>-list.component';
import { <%= classifiedModuleName %>FormComponent } from './<%= dasherizedModuleName %>-form/<%= dasherizedModuleName %>-form.component';
import { <%= classifiedModuleName %>Resolve } from './<%= dasherizedModuleName %>-resolve.guard';
import { <%= classifiedModuleName %>ListResolve } from './<%= dasherizedModuleName %>-list-resolve.guard';

export const <%= camelizedModuleName %>Routes: Routes = [
  {
    path: '', component: <%= classifiedModuleName %>CenterComponent, children: [
      {
        path: '',
        component: <%= classifiedModuleName %>ListComponent,
        resolve: { list: <%= classifiedModuleName %>ListResolve }
      }
    ]
  },
  {
    path: 'new', component: <%= classifiedModuleName %>CenterComponent, children: [
      {
        path: '',
        component: <%= classifiedModuleName %>ListComponent,
        resolve: { list: <%= classifiedModuleName %>ListResolve }
      },
      {
        path: '',
        component: <%= classifiedModuleName %>FormComponent,
        canDeactivate: [CanDeactivateGuard],
        outlet: 'details'
      }
    ]
  },
  {
    path: ':id', component: <%= classifiedModuleName %>CenterComponent, children: [
      {
        path: '',
        component: <%= classifiedModuleName %>ListComponent,
        resolve: { list: <%= classifiedModuleName %>ListResolve }
      },
      {
        path: '',
        component: <%= classifiedModuleName %>FormComponent,
        resolve: { <%= camelizedModuleName %>: <%= classifiedModuleName %>Resolve },
  canDeactivate: [CanDeactivateGuard],
  outlet: 'details'
      }
]
  }
];

export const <%= camelizedModuleName %>Routing = RouterModule.forChild(<%= camelizedModuleName %>Routes);
