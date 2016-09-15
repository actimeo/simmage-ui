import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import '../../../rxjs_operators';

import { AppModule } from '../../../app.module';
import { TopicsListComponent } from './topics-list.component';
import { TopicsService } from '../../../db-services/topics.service';
import { DbTopic } from '../../../db-models/organ';

let comp: TopicsListComponent;
let fixture: ComponentFixture<TopicsListComponent>;
let els: DebugElement[];
let el: DebugElement;
let topicsService: TopicsService;

const fakeTopicsService = {
  topicsState: Observable.of([
    {
      top_id: 1,
      top_name: 'Topic 1',
      top_description: 'Desc 1'
    },
    {
      top_id: 4,
      top_name: 'Topic 4',
      top_description: 'Desc 4'
    }
  ])
};

const fakeActivatedRoute = {
  params: Observable.of({ toto: 'titi', 'selid': '1' })
};

const fakeActivatedRouteWithoutSel = {
  params: Observable.of({ toto: 'titi' })
};

describe('TopicsListComponent', () => {
  beforeEach(() => {


  });

  it('should get list items', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [
        { provide: TopicsService, useValue: fakeTopicsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
      ]
    });
    fixture = TestBed.createComponent(TopicsListComponent);
    comp = fixture.componentInstance; // test instance
    topicsService = fixture.debugElement.injector.get(TopicsService);

    fixture.detectChanges(); // trigger data binding

    comp.topicsData.subscribe(r => {
      expect(r.length).toBe(2, 'topicsData length should be 2');
    });

    // get the items
    els = fixture.debugElement.queryAll(By.css('md-list-item'));
    expect(els.length).toBe(2, 'you should have 2 list items');

    // verify name
    els = fixture.debugElement.queryAll(By.css('h3.mod-sidenav'));
    expect(els[0].nativeElement.textContent).toContain('Topic 1', 'first item name should be Topic 1');

    // verify desc
    els = fixture.debugElement.queryAll(By.css('p.mod-sidenav'));
    expect(els[1].nativeElement.textContent).toContain('Desc 4', 'second item desc should be Desc 4');
  });

  it('should subscribe/unsubscribe', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [
        { provide: TopicsService, useValue: fakeTopicsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
      ]
    });
    fixture = TestBed.createComponent(TopicsListComponent);
    comp = fixture.componentInstance; // test instance
    topicsService = fixture.debugElement.injector.get(TopicsService);

    fixture.detectChanges(); // trigger data binding
    expect(comp.sub).not.toBeNull('...');
    expect(comp.sub).toEqual(jasmine.any(Subscription));

    comp.ngOnDestroy();
    spyOn(comp.sub, 'unsubscribe');
    comp.ngOnDestroy();

    expect(comp.sub.unsubscribe).toHaveBeenCalled();
  });

  it('should add a "selected" class to the selected topic', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [
        { provide: TopicsService, useValue: fakeTopicsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteWithoutSel },
      ]
    });
    fixture = TestBed.createComponent(TopicsListComponent);
    comp = fixture.componentInstance; // test instance
    topicsService = fixture.debugElement.injector.get(TopicsService);

    fixture.detectChanges(); // trigger data binding
    els = fixture.debugElement.queryAll(By.css('md-list-item.selected'));
    expect(els.length).toBe(0, 'no item should be selected');

    comp.selectedId = 4;
    fixture.detectChanges(); // trigger data binding
    els = fixture.debugElement.queryAll(By.css('md-list-item.selected h3'));
    expect(els.length).toBe(1, 'An item should be selected');
    expect(els[0].nativeElement.textContent).toContain('Topic 4', 'The Topic 4 must be selected');
  });

  it('should add a "selected" class to the selected topic from selid query param route', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [
        { provide: TopicsService, useValue: fakeTopicsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
      ]
    });
    fixture = TestBed.createComponent(TopicsListComponent);
    comp = fixture.componentInstance; // test instance
    topicsService = fixture.debugElement.injector.get(TopicsService);

    fixture.detectChanges(); // trigger data binding
    els = fixture.debugElement.queryAll(By.css('md-list-item.selected'));
    expect(els.length).toBe(1, '1 item should be selected');
    expect(els[0].nativeElement.textContent).toContain('Topic 1', 'The Topic 1 must be selected');

    expect(comp.selectedId).toBe(1);
  });

});
