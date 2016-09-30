/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { <%= classifiedModuleName %>FormComponent } from './<%= dasherizedModuleName %>-form.component';

describe('Component: <%= classifiedModuleName %>Form', () => {
  it('should create an instance', () => {
    let component = new <%= classifiedModuleName %>FormComponent();
    expect(component).toBeTruthy();
  });
});
