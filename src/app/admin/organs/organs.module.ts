import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { MdButtonModule } from '@angular2-material/button/button';
import { MdCardModule } from '@angular2-material/card/card';
import { MdIconModule, MdIconRegistry } from '@angular2-material/icon/icon';
import { MdInputModule } from '@angular2-material/input/input';
import { MdListModule } from '@angular2-material/list/list';
import { MdRadioModule, MdUniqueSelectionDispatcher } from '@angular2-material/radio/radio';
import { MdToolbarModule } from '@angular2-material/toolbar/toolbar';

import { organsRouting } from './organs.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OrganComponent } from './organ/organ.component';
import { OrgansComponent } from './organs-center/organs.component';
import { OrgansListComponent } from './organs-list/organs-list.component';

import { OrganResolve } from './organ-resolve.guard';
import { OrganService } from './organ.service';
import { OrgansService } from './organs.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MdButtonModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdRadioModule,
    MdToolbarModule,

    SharedModule.forRoot(),
    organsRouting,
  ],
  declarations: [
    OrganComponent,
    OrgansComponent,
    OrgansListComponent,
  ],
  providers: [
    MdIconRegistry,
    MdUniqueSelectionDispatcher,

    OrganResolve,
    OrganService,
    OrgansService
  ],
  exports: [
  ]
})
export class OrgansModule {
}
