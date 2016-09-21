/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { async, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import '../../../rxjs_operators';

import { AppModule } from '../../../app.module';
import { OrgansModule } from '../organs.module';
import { DbOrganization } from '../../../db-models/organ';
import { OrganService } from '../organ.service';
import { OrgansListComponent } from './organs-list.component';
import { OrganComponent } from '../organ/organ.component';

class FakeOS {
  loadOrganizations(internal: boolean) {
    if (internal) {
      return Observable.of([{
        org_id: 1,
        org_name: 'Organization 1',
        org_description: 'A little description for 1',
        org_internal: true
      },
        {
          org_id: 2,
          org_name: 'Organization 2',
          org_description: 'A little description for 2',
          org_internal: true
        },
        {
          org_id: 3,
          org_name: 'Organization 3',
          org_description: 'A little description for 3',
          org_internal: true
        }]);
    } else {
      return Observable.of([{
        org_id: 4,
        org_name: 'Organization 4',
        org_description: 'A little description for 4',
        org_internal: false
      },
        {
          org_id: 5,
          org_name: 'Organization 5',
          org_description: 'A little description for 5',
          org_internal: false
        },
        {
          org_id: 6,
          org_name: 'Organization 6',
          org_description: 'A little description for 6',
          org_internal: false
        },
        {
          org_id: 7,
          org_name: 'Organization 7',
          org_description: 'A little description for 7',
          org_internal: false
        }]);
    }
  };
}

const fakeOS = new FakeOS();

const fakeActivatedRouteSelid = {
  params: Observable.of({ toto: 'titi', 'selid': '3' })
};

const fakeActivatedRoute = {
  params: Observable.of({ toto: 'titi' })
};

describe('Component: OrgansList', () => {

  beforeEach(() => { });

  it('should instantiate two lists of organizations of 3 and 4 elements', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, OrgansModule, RouterTestingModule],
      providers: [
        { provide: OrganService, useValue: fakeOS }
      ]
    });

    const fixture = TestBed.createComponent(OrgansListComponent);
    const organsComponent = fixture.componentInstance;
    const os = fixture.debugElement.injector.get(OrganService);

    fixture.detectChanges();

    organsComponent.organsInternalData.subscribe(o => {
      expect(o.length).toBe(3, 'You should have 3 internal organizations');
    });
    organsComponent.organsExternalData.subscribe(o => {
      expect(o.length).toBe(4, 'You should have 4 external organizations');
    });

    const element = fixture.nativeElement;
    const organStatus = element.querySelectorAll('md-nav-list');
    expect(organStatus.length).toBe(2, 'You should have 2 lists of organizations');
    const organIntNames = organStatus[0].querySelectorAll('md-list-item');
    const organExtNames = organStatus[1].querySelectorAll('md-list-item');

    expect(organIntNames[1].textContent).toContain('Organization 2', 'Second item name should be organization 2');
    expect(organExtNames[3].textContent).toContain('Organization 7', 'Last item name should be Organization 7');
  });

  it('should be able to subscribe/unsubscribe', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, OrgansModule, RouterTestingModule],
      providers: [
        { provide: OrganService, useValue: fakeOS },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteSelid }
      ]
    });

    const fixture = TestBed.createComponent(OrgansListComponent);
    const organsComponent = fixture.componentInstance;
    const os = fixture.debugElement.injector.get(OrganService);

    fixture.detectChanges();
    expect(organsComponent.sub).not.toBeNull('...');
    expect(organsComponent.sub).toEqual(jasmine.any(Subscription));

    spyOn(organsComponent.sub, 'unsubscribe');
    organsComponent.ngOnDestroy();
    expect(organsComponent.sub.unsubscribe).toHaveBeenCalled();
  });

  it('should add a "selected" class to the selected organization', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, OrgansModule, RouterTestingModule],
      providers: [
        { provide: OrganService, useValue: fakeOS },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });

    const fixture = TestBed.createComponent(OrgansListComponent);
    const organsComponent = fixture.componentInstance;
    const os = fixture.debugElement.injector.get(OrganService);

    fixture.detectChanges();
    const elements = fixture.debugElement.queryAll(By.css('md-list-item.selected'));
    expect(elements.length).toBe(0, 'no item should be selected');

    organsComponent.selectedId = 5;
    fixture.detectChanges();
    const element = fixture.debugElement.queryAll(By.css('md-list-item.selected h3'));
    expect(element.length).toBe(1, 'One item should be selected');
    expect(element[0].nativeElement.textContent).toContain('Organization 5', 'Organization 5 must be selected');

    expect(organsComponent.selectedId).toBe(5);
  });

  it('should add a "selected" class to the organization through selid query param route', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, OrgansModule, RouterTestingModule],
      providers: [
        { provide: OrganService, useValue: fakeOS },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteSelid }
      ]
    });

    const fixture = TestBed.createComponent(OrgansListComponent);
    const organsComponent = fixture.componentInstance;
    const os = fixture.debugElement.injector.get(OrganService);

    fixture.detectChanges();
    const elements = fixture.debugElement.queryAll(By.css('md-list-item.selected'));
    expect(elements.length).toBe(1, 'One item should be selected');
    expect(elements[0].nativeElement.textContent).toContain('Organization 3', 'The organization 3 must be selected');

    expect(organsComponent.selectedId).toBe(3);
  });
});
