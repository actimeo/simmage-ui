/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import '../../../rxjs_operators';

import { PortalsListComponent } from './portals-list.component';
import { AppModule } from '../../../app.module';
import { PortalsModule } from '../portals.module';

let comp: PortalsListComponent;
let fixture: ComponentFixture<PortalsListComponent>;
let els: DebugElement[];

const fakeActivatedRoute = {
  params: Observable.of({ toto: 'titi', 'selid': '1' }),
  data: Observable.of({
    list: [
      {
        por_id: 1,
        por_name: 'Portal 1',
        por_description: 'Description 1'
      },
      {
        por_id: 4,
        por_name: 'Portal 4',
        por_description: 'Description 4'
      }
    ]
  })
};

const fakeActivatedRouteWithoutSel = {
  params: Observable.of({ toto: 'titi' }),
  data: Observable.of({
    list: [
      {
        por_id: 1,
        por_name: 'Portal 1',
        por_description: 'Description 1'
      },
      {
        por_id: 4,
        por_name: 'Portal 4',
        por_description: 'Description 4'
      }
    ]
  })
};

describe('Component: PortalsList', () => {
  it('should get a list of portals', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, PortalsModule, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(PortalsListComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    comp.portalsData.subscribe(r => {
      expect(r.length).toBe(2, 'portalsData length should be 2');
    });

    els = fixture.debugElement.queryAll(By.css('md-list-item'));
    expect(els.length).toBe(2, 'you should have 2 list items in your template');

    els = fixture.debugElement.queryAll(By.css('h3.mod-sidenav'));
    expect(els[0].nativeElement.textContent).toContain('Portal 1', 'First item name should be Portal 1');

    els = fixture.debugElement.queryAll(By.css('p.mod-sidenav'));
    expect(els[1].nativeElement.textContent).toContain('Description 4', 'Second item description should be Description 4');
  });


  it('should add a "selected" class to the selected portal', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, PortalsModule, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRouteWithoutSel }
      ]
    });

    fixture = TestBed.createComponent(PortalsListComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    els = fixture.debugElement.queryAll(By.css('md-list-item.selected'));
    expect(els.length).toBe(0, 'no item should be selected');

    comp.selectedId = Observable.of(4);
    fixture.detectChanges();
    els = fixture.debugElement.queryAll(By.css('md-list-item.selected h3'));
    expect(els.length).toBe(1, 'an item should be selected');
    expect(els[0].nativeElement.textContent).toContain('Portal 4', 'Portal 4 should be the one selected');
  });

  it('should add a "selected" class to the selected portal from selid query param route', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, PortalsModule, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(PortalsListComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
    els = fixture.debugElement.queryAll(By.css('md-list-item.selected'));
    expect(els.length).toBe(1, '1 item should be selected');
    expect(els[0].nativeElement.textContent).toContain('Portal 1', 'Portal 1 should be the one selected');

    comp.selectedId.subscribe(s => {
      expect(s).toBe('1');
    });
  });
});
