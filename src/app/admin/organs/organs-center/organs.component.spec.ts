/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { async, inject, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { OrgansComponent } from './organs.component';
import { DbOrganization } from '../../../services/backend/db-models/organ';
import { OrganService } from '../../../services/backend/organ.service';

describe('Component: Organs', () => {
  it('should create an instance', () => {
    let component = new OrgansComponent();
    expect(component).toBeTruthy();
  });
});
