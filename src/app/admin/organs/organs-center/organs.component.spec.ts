/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { async, inject, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { OrgansComponent } from './organs.component';
import { DbOrganization } from '../../../db-models/organ';
import { OrgansService } from '../organs.service';

describe('Component: Organs', () => {
  it('should create an instance', () => {
    let component = new OrgansComponent();
    expect(component).toBeTruthy();
  });
});
