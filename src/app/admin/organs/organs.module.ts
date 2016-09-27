import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { MaterialModule } from '@angular/material';

import { organsRouting } from './organs.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OrganComponent } from './organ/organ.component';
import { OrgansComponent } from './organs-center/organs.component';
import { OrgansListComponent } from './organs-list/organs-list.component';

import { OrganResolve } from './organ-resolve.guard';
import { OrganService } from './organ.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule.forRoot(),
    organsRouting,
  ],
  declarations: [
    OrganComponent,
    OrgansComponent,
    OrgansListComponent,
  ],
  providers: [
    OrganResolve,
    OrganService
  ],
  exports: [
  ]
})
export class OrgansModule {
}
