import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { listsViewsRouting } from './lists-views.routing';
import { ListsViewsComponent } from './lists-views.component';

@NgModule({
  imports: [
    CommonModule,
    listsViewsRouting
  ],
  declarations: [ListsViewsComponent]
})
export class ListsViewsModule { }
