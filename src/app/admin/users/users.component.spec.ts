/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { addProviders, async, inject } from '@angular/core/testing';
import { UsersComponent } from './users.component';

describe('Component: Users', () => {
  it('should create an instance', () => {
    let component = new UsersComponent();
    expect(component).toBeTruthy();
  });
});
