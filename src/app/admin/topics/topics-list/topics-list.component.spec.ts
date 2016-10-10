import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import '../../../rxjs_operators';

import { AppModule } from '../../../app.module';
import { TopicsModule } from '../topics.module';
import { TopicsListComponent } from './topics-list.component';

let comp: TopicsListComponent;
let fixture: ComponentFixture<TopicsListComponent>;
let els: DebugElement[];

const fakeActivatedRoute = {
  params: Observable.of({ toto: 'titi', 'selid': '1' }),
  data: Observable.of({
    list: [
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
    ]
  })
};

const fakeActivatedRouteWithoutSel = {
  params: Observable.of({ toto: 'titi' }),
  data: Observable.of({
    list: [
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
    ]
  })
};

describe('TopicsListComponent', () => {
  beforeEach(() => {


  });

  it('should get list items', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, TopicsModule, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
      ]
    });
    fixture = TestBed.createComponent(TopicsListComponent);
    comp = fixture.componentInstance; // test instance

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

  it('should add a "selected" class to the selected topic', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, TopicsModule, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRouteWithoutSel },
      ]
    });
    fixture = TestBed.createComponent(TopicsListComponent);
    comp = fixture.componentInstance; // test instance

    fixture.detectChanges(); // trigger data binding
    els = fixture.debugElement.queryAll(By.css('md-list-item.selected'));
    expect(els.length).toBe(0, 'no item should be selected');

    comp.selectedId = Observable.of(4);
    fixture.detectChanges(); // trigger data binding
    els = fixture.debugElement.queryAll(By.css('md-list-item.selected h3'));
    expect(els.length).toBe(1, 'An item should be selected');
    expect(els[0].nativeElement.textContent).toContain('Topic 4', 'The Topic 4 must be selected');
  });

  it('should add a "selected" class to the selected topic from selid query param route', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, TopicsModule, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
      ]
    });
    fixture = TestBed.createComponent(TopicsListComponent);
    comp = fixture.componentInstance; // test instance

    fixture.detectChanges(); // trigger data binding
    els = fixture.debugElement.queryAll(By.css('md-list-item.selected'));
    expect(els.length).toBe(1, '1 item should be selected');
    expect(els[0].nativeElement.textContent).toContain('Topic 1', 'The Topic 1 must be selected');

    comp.selectedId.subscribe(s => expect(s).toBe('1'));
  });

});
