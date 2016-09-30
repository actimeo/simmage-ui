/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OrganComponent } from './organ.component';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { DbOrganization } from '../../../db-models/organ';
import { OrganService } from '../organ.service';
import { AppModule } from '../../../app.module';
import { OrgansModule } from '../organs.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { Response, ResponseOptions } from '@angular/http';

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
  org_internal: false
};

const routeNew = [{
  path: '/admin/organs/new'
}];
const fakeActivatedRoute = {
  params: Observable.of({ toto: 'titi' }),
  data: Observable.of({})
};
const fakeActivatedRouteWithData = {
  params: Observable.of({ toto: 'titi', 'selid': 1 }),
  data: Observable.of(fakeOrgan)
};
const fakeActivatedRouteWithDataTrue = {
  params: Observable.of({ toto: 'titi', 'selid': 1 }),
  data: Observable.of({
    organ: {
      org_id: 1,
      org_name: 'Organization 1',
      org_description: 'A little description for 1',
      org_internal: true
    }
  })
};

const fakeRouter = jasmine.createSpyObj('Router', ['navigate']);
const fakeServiceLoad = jasmine.createSpyObj('OrganService',
  ['loadOrgan', 'deleteOrgan', 'addOrgan', 'updateOrgan', 'loadOrganizations']);

let comp: OrganComponent;
let fixture: ComponentFixture<OrganComponent>;

class FakeOrganService {
  loadOrganizations(internal: boolean) {}
}

describe('Component: Organ', () => {

  beforeEach(() => {
    fakeRouter.navigate.calls.reset();
    fakeServiceLoad.addOrgan.calls.reset();
    fakeServiceLoad.deleteOrgan.calls.reset();
    fakeServiceLoad.updateOrgan.calls.reset();
    fakeServiceLoad.loadOrgan.calls.reset();
    fakeServiceLoad.loadOrganizations.calls.reset();
  });

  it('should initialize an empty form when creating a new organization', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, OrgansModule, RouterTestingModule],
      providers: [
        { provide: OrganService, useClass: FakeOrganService },
        { provide: Router, useValue: fakeRouter },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(OrganComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
    expect(comp.form).not.toBe(null, 'you should have a form instatiated');

    expect(comp.form.value).toEqual({
      name: '',
      description: '',
      internal: ''
    }, 'The form should be initialized with an empty name, empty description and the Internal radio checked');

    expect(comp.creatingNew).toBe(true);
  });

  it('should create a tempalte with an empty form with internal radio checked when creating a new organziation', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, OrgansModule, RouterTestingModule],
      providers: [
        { provide: OrganService, useClass: FakeOrganService },
        { provide: Router, useValue: fakeRouter },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(OrganComponent);

    const element = fixture.nativeElement;

    fixture.detectChanges();
    expect(element.querySelector('button[md-raised-button]').hasAttribute('disabled'))
      .toBe(true, 'Button Save should be disabled if the form is not valid');
  });

  it('should call the organ service if the form is valid when validating it, then redirect to list with selid', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, OrgansModule, RouterTestingModule],
      providers: [
        { provide: OrganService, useValue: fakeServiceLoad },
        { provide: Router, useValue: fakeRouter },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(OrganComponent);
    fixture.detectChanges();

    fakeServiceLoad.addOrgan.and.returnValue(Observable.of(1));

    comp = fixture.componentInstance;
    comp.nameCtrl.setValue('organization name');
    comp.descriptionCtrl.setValue('organization description');
    comp.internalCtrl.setValue('val_external');

    comp.onSubmit();

    expect(fakeServiceLoad.addOrgan).toHaveBeenCalledWith(
      'organization name',
      'organization description',
      'val_external'
    );

    expect(comp.errorDetails).toBe('', 'You should not have error details');
    expect(comp.errorMsg).toBe('', 'You should not have an error message');

    expect(comp.id).toBe(1);
    expect(fakeRouter.navigate).toHaveBeenCalledWith(['/admin/organs', { selid: comp.id }]);
  });

  it('should show an error message if something went wrong with the database', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, OrgansModule, RouterTestingModule],
      providers: [
        { provide: OrganService, useValue: fakeServiceLoad },
        { provide: Router, useValue: fakeRouter },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(OrganComponent);
    fixture.detectChanges();

    const resOpt = new ResponseOptions({ body: 'Error !', status: 404 });
    const err = new Response(resOpt);
    const subject = new Subject();
    fakeServiceLoad.addOrgan.and.returnValue(subject);

    comp = fixture.componentInstance;

    comp.onSubmit();

    subject.error(err);

    expect(fakeServiceLoad.addOrgan).toHaveBeenCalledWith('', '', '');

    expect(comp.errorDetails).not.toBe('', 'You should have a message displayed');
    expect(comp.errorMsg).toBe('Error adding organization');
    expect(comp.id).toBe(undefined);
  });

  it('should initialize a form filled with data when editing an organization', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, OrgansModule, RouterTestingModule],
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
      internal: false
    }, 'Should be initialized with "Organization 1" in `name` field, \
     "A little description for 1" in `description` field and External radio checked');
  });

  it('should call the organ service to update an organization, then return to the list', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, OrgansModule, RouterTestingModule],
      providers: [
        { provide: OrganService, useValue: fakeServiceLoad },
        { provide: Router, useValue: fakeRouter },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteWithData }
      ]
    });

    fixture = TestBed.createComponent(OrganComponent);
    fixture.detectChanges();

    fakeServiceLoad.updateOrgan.and.returnValue(Observable.of(true));

    comp = fixture.componentInstance;
    comp.id = 3;
    comp.nameCtrl.setValue('organization name');
    comp.descriptionCtrl.setValue('organization description');
    comp.internalCtrl.setValue('val_external');

    comp.onSubmit();

    expect(fakeServiceLoad.updateOrgan).toHaveBeenCalledWith(
      3,
      'organization name',
      'organization description',
      'val_external'
    );

    expect(comp.errorDetails).toBe('', 'You should not have error details');
    expect(comp.errorMsg).toBe('', 'You should not have an error message');

    expect(fakeRouter.navigate).toHaveBeenCalledWith(['/admin/organs', { selid: comp.id }]);
  });

  it('should show error messages if something went wrong with the database when updating', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, OrgansModule, RouterTestingModule],
      providers: [
        { provide: OrganService, useValue: fakeServiceLoad },
        { provide: Router, useValue: fakeRouter },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteWithDataTrue }
      ]
    });

    fixture = TestBed.createComponent(OrganComponent);
    fixture.detectChanges();

    const resOpt = new ResponseOptions({ body: 'Error !', status: 404 });
    const err = new Response(resOpt);
    const subject = new Subject();
    fakeServiceLoad.updateOrgan.and.returnValue(subject);

    comp = fixture.componentInstance;
    expect(comp.creatingNew).toBe(false, 'creating new should be false');
    comp.onSubmit();

    subject.error(err);

    expect(fakeServiceLoad.updateOrgan).toHaveBeenCalledWith(1, 'Organization 1', 'A little description for 1', true);

    expect(comp.errorDetails).not.toBe('', 'You should have a message displayed');
    expect(comp.errorMsg).toBe('Error updating organization');
  });

  it('should call organservice when deleting an organization and redirect to list if succeed', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, OrgansModule, RouterTestingModule],
      providers: [
        { provide: OrganService, useValue: fakeServiceLoad },
        { provide: Router, useValue: fakeRouter },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteWithData }
      ]
    });

    fixture = TestBed.createComponent(OrganComponent);
    fixture.detectChanges();

    fakeServiceLoad.deleteOrgan.and.returnValue(Observable.of(true));

    comp = fixture.componentInstance;
    comp.doDelete();

    expect(fakeServiceLoad.deleteOrgan).toHaveBeenCalledWith(comp.id);

    expect(comp.errorDetails).toBe('', 'You should not have error details');
    expect(comp.errorMsg).toBe('', 'You should not have an error message');

    expect(fakeRouter.navigate).toHaveBeenCalledWith(['/admin/organs']);
  });

  it('should show error messages when an error occurs while trying to delete an organization', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, OrgansModule, RouterTestingModule],
      providers: [
        { provide: OrganService, useValue: fakeServiceLoad },
        { provide: Router, useValue: fakeRouter },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteWithData }
      ]
    });

    fixture = TestBed.createComponent(OrganComponent);
    fixture.detectChanges();

    const resOpt = new ResponseOptions({ body: 'Error !', status: 404 });
    const err = new Response(resOpt);
    const subject = new Subject();
    fakeServiceLoad.deleteOrgan.and.returnValue(subject);

    subject.error(err);

    comp = fixture.componentInstance;
    comp.doDelete();

    expect(fakeServiceLoad.deleteOrgan).toHaveBeenCalledWith(comp.id);

    expect(comp.errorDetails).not.toBe('', 'You should have a message displayed');
    expect(comp.errorMsg).toBe('Error deleting organization');
  });

  it('should go back to list with doCancel', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, OrgansModule, RouterTestingModule],
      providers: [
        { provide: OrganService, useValue: fakeServiceLoad },
        { provide: Router, useValue: fakeRouter },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteWithData }
      ]
    });

    fixture = TestBed.createComponent(OrganComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.originalData).toEqual(fakeOriginalData, 'originalData should contain data form');

    fixture.componentInstance.doCancel();

    expect(fakeRouter.navigate).toHaveBeenCalledWith(['/admin/organs']);
  });

  it('should display an error when trying to navigate while an organization is still under modification', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, OrgansModule, RouterTestingModule],
      providers: [
        { provide: OrganService, useValue: fakeServiceLoad },
        { provide: Router, useValue: fakeRouter },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteWithData }
      ]
    });

    fixture = TestBed.createComponent(OrganComponent);
    fixture.detectChanges();

    comp = fixture.componentInstance;

    comp.nameCtrl.setValue('blablablablalb');
    comp.canDeactivate();
    expect(comp.pleaseSave).toBeTruthy();

    comp.nameCtrl.setValue(comp.originalData.org_name);
    comp.pleaseSave = false;
    comp.canDeactivate();
    expect(comp.pleaseSave).toBeFalsy();

    comp.descriptionCtrl.setValue('blablabla');
    comp.internalCtrl.setValue('val_internal');
    comp.canDeactivate();
    expect(comp.pleaseSave).toBeTruthy();
  });
});
