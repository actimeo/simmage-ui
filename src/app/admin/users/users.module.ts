import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { MaterialModule } from '@angular/material';

import { usersRouting } from './users.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsersComponent } from './users-center/users.component';

import { UsersService } from './users.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule.forRoot(),
    usersRouting,
  ],
  declarations: [
    UsersComponent
  ],
  providers: [
    UsersService
  ],
  exports: [
  ]
})
export class UsersModule {
}
