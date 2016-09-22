import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { MdButtonModule } from '@angular2-material/button/button';
import { MdCardModule } from '@angular2-material/card/card';
import { MdIconModule, MdIconRegistry } from '@angular2-material/icon/icon';
import { MdInputModule } from '@angular2-material/input/input';
import { MdListModule } from '@angular2-material/list/list';
import { MdToolbarModule } from '@angular2-material/toolbar/toolbar';

import { usersRouting } from './users.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsersComponent } from './users-center/users.component';

import { UsersService } from './users.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdToolbarModule,
    MdListModule,
    MdIconModule,

    SharedModule.forRoot(),
    usersRouting,
  ],
  declarations: [
    UsersComponent
  ],
  providers: [
    MdIconRegistry,
    UsersService
  ],
  exports: [
  ]
})
export class UsersModule {
}
