import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MdIconModule, MdIconRegistry } from '@angular2-material/icon/icon';

import { ErrorMsgComponent } from './error-msg/error-msg.component';
import { UserRightComponent } from './user-right/user-right.component';

import { UserService } from './user.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdIconModule
  ],
  exports: [
    CommonModule, FormsModule, ErrorMsgComponent, UserRightComponent
  ],
  declarations: [ErrorMsgComponent, UserRightComponent],
  providers: [
    MdIconRegistry,
  ]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [UserService]
    };
  }
}
