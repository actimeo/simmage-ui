/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OrganComponent } from './organ.component';
import { Observable } from 'rxjs/Observable';
import { DbOrganization } from '../../../db-models/organ';
import { OrganService } from '../../../db-services/organ.service';
import { AppModule } from '../../../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';

const fakeOrgan = {
  organ: {
    org_id: 1,
    org_name: 'Organization 1',
    org_description: 'A little description for 1',
    org_internal: false
  }
};

const fakeOriginalData = {
  org_id: null,
  org_name: 'Organization 1',
  org_description: 'A little description for 1',
  org_internal: 'val_external'
};

const routeNew = [{
  path: '/admin/organs/new'
}];
const fakeActivatedRoute = {
  params: Observable.of({ toto: 'titi'}),
  data: Observable.of({})
};
const fakeActivatedRouteWithData = {
  params: Observable.of({toto: 'titi', 'selid': 1}),
  data: Observable.of(fakeOrgan)
};

const fakeRouter = jasmine.createSpyObj('Router', ['navigate']);
const fakeServiceLoad = jasmine.createSpyObj('OrganService', ['loadOrgan']);

let comp: OrganComponent;
let fixture: ComponentFixture<OrganComponent>;
let os: OrganService;

describe('Component: Organ', () => {

  beforeEach(() => {
    fakeRouter.navigate.calls.reset();
  });

  it('should initialize an empty form and internal radio checked when creating a new organization', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [
        { provide: OrganService, useValue: os },
        { provide: Router, useValue: fakeRouter },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(OrganComponent);
    comp = fixture.componentInstance;
    os = fixture.debugElement.injector.get(OrganService);
    fixture.detectChanges();
    expect(comp.form).not.toBe(null, 'you should have a form instatiated');

    expect(comp.form.value).toEqual({
      name: '',
      description: '',
      internal: 'val_internal'
    }, 'The form should be initialized with an empty name, empty description and the Internal radio checked');

    expect(comp.creatingNew).toBe(true);
  });

  it('should initialize a form filled with data when editing an organization', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [
        { provide: OrganService, useValue: fakeServiceLoad },
        { provide: Router, useValue: fakeRouter },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteWithData }
      ]
    });

    fixture = TestBed.createComponent(OrganComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.form).not.toBeNull('A form should be initialized in `form` field');
    expect(fixture.componentInstance.creatingNew).toBe(false);
    expect(fixture.componentInstance.form.value).toEqual({
      name: 'Organization 1',
      description: 'A little description for 1',
      internal: 'val_external'
    }, 'Should be initialized with "Organization 1" in `name` field, \
     "A little description for 1" in `description` field and External radio checked');
  });

  it('should go back to list with doCancel', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [
        { provide: OrganService, useValue: fakeServiceLoad },
        { provide: Router, useValue: fakeRouter },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteWithData }
      ]
    });

    fixture = TestBed.createComponent(OrganComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.originalData).toEqual(fakeOriginalData, 'originalData should contain data form');


  });
});
