/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { <%= classifiedModuleName %>CenterComponent } from './<%= dasherizedModuleName %>-center.component';

describe('Component: <%= classifiedModuleName %>Center', () => {
  it('should create an instance', () => {
    let component = new <%= classifiedModuleName %>CenterComponent();
    expect(component).toBeTruthy();
  });
});
