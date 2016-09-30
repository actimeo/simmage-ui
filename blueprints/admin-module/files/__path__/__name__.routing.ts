import { Routes, RouterModule } from '@angular/router';

import { <%= classifiedModuleName %>Component } from './<%= dasherizedModuleName %>.component';

export const <%= camelizedModuleName %>Routes: Routes = [
  {
    path: '', component: <%= classifiedModuleName %>Component,
  },
];

export const <%= camelizedModuleName %>Routing = RouterModule.forChild(<%= camelizedModuleName %>Routes);
