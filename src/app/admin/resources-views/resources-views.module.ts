import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { resourcesViewsRouting } from './resources-views.routing';
import { ResourcesViewsComponent } from './resources-views.component';

@NgModule({
  imports: [
    CommonModule,
    resourcesViewsRouting
  ],
  declarations: [ResourcesViewsComponent]
})
export class ResourcesViewsModule { }
