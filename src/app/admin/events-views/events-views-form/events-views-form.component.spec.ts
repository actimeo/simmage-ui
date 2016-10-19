/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Response, ResponseOptions } from '@angular/http';

import { EventsViewsFormComponent } from './events-views-form.component';
import { AppModule } from '../../../app.module';
import { EventsViewsModule } from '../events-views.module';
import { EventsViewsService } from '../events-views.service';

let comp: EventsViewsFormComponent;
let fixture: ComponentFixture<EventsViewsFormComponent>;

class FakeEventsViewsService {
  loadEventsViews() {
    return Observable.of([
      {
        evv_id: 1,
        evv_name: 'a name'
      },
      {
        evv_id: 3,
        evv_name: 'another name'
      }
    ]);
  }

  addEventsViews() { }
  deleteEventsViews() { }
  updateEventsViews() { }
}

const fakeEventsViewsService = new FakeEventsViewsService();

const fakeActivatedRoute = {
  data: Observable.of({
    'eventsViews': {
      evv_id: 2,
      evv_name: 'this name',
      evv_categories: [],
      ety_id: 2,
      top_ids: []
    }
  }),
  params: Observable.of({})
};

const fakeActivatedRouteNew = {
  data: Observable.of({}),
  params: Observable.of({})
};

describe('Component: EventsViewsForm', () => {
  it('should display EventsViews', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, EventsViewsModule, RouterTestingModule],
      providers: [
        { provide: EventsViewsService, useValue: fakeEventsViewsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });
    fixture = TestBed.createComponent(EventsViewsFormComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    expect(comp.nameCtrl.value).toEqual('this name');
  });

  it('should call doCancel when clicking on cancel button', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, EventsViewsModule, RouterTestingModule],
      providers: [
        { provide: EventsViewsService, useValue: fakeEventsViewsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteNew }
      ]
    });
    fixture = TestBed.createComponent(EventsViewsFormComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    const element = fixture.nativeElement;
    const cancelButton = element.querySelectorAll('button')[1];
    expect(cancelButton).not.toBeNull('You should have a `button` element');
    expect(cancelButton.textContent).toContain('Cancel');

    spyOn(comp, 'doCancel');
    cancelButton.dispatchEvent(new Event('click'));
    expect(comp.doCancel).toHaveBeenCalled();
  });

  it('should call doCancel then goBakctoList when clicking on cancel button', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, EventsViewsModule, RouterTestingModule],
      providers: [
        { provide: EventsViewsService, useValue: fakeEventsViewsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteNew }
      ]
    });
    fixture = TestBed.createComponent(EventsViewsFormComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    const element = fixture.nativeElement;
    const cancelButton = element.querySelectorAll('button')[1];
    expect(cancelButton).not.toBeNull('You should have a `button` element');
    expect(cancelButton.textContent).toContain('Cancel');

    spyOn(comp, 'goBackToList');
    cancelButton.dispatchEvent(new Event('click'));
    expect(comp.goBackToList).toHaveBeenCalled();
  });

  it('should call doDelete when clicking on delete button', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, EventsViewsModule, RouterTestingModule],
      providers: [
        { provide: EventsViewsService, useValue: fakeEventsViewsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });
    fixture = TestBed.createComponent(EventsViewsFormComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    const element = fixture.nativeElement;
    const deleteButton = element.querySelectorAll('button')[0];
    expect(deleteButton).not.toBeNull('You should have a `button` element');
    expect(deleteButton.textContent).toContain('Delete');

    spyOn(comp, 'doDelete');
    deleteButton.dispatchEvent(new Event('click'));
    expect(comp.doDelete).toHaveBeenCalled();
  });

  it('should call doDelete then goBackToList when clicking on delete button', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, EventsViewsModule, RouterTestingModule],
      providers: [
        { provide: EventsViewsService, useValue: fakeEventsViewsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });
    fixture = TestBed.createComponent(EventsViewsFormComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    const element = fixture.nativeElement;
    const deleteButton = element.querySelectorAll('button')[0];
    expect(deleteButton).not.toBeNull('You should have a `button` element');
    expect(deleteButton.textContent).toContain('Delete');

    spyOn(comp.service, 'deleteEventsViews').and.returnValue(Observable.of(true));
    spyOn(comp, 'goBackToList');
    deleteButton.dispatchEvent(new Event('click'));
    expect(comp.goBackToList).toHaveBeenCalled();
  });

  it('should display error on delete error', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, EventsViewsModule, RouterTestingModule],
      providers: [
        { provide: EventsViewsService, useValue: fakeEventsViewsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });
    fixture = TestBed.createComponent(EventsViewsFormComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    const element = fixture.nativeElement;
    const deleteButton = element.querySelectorAll('button')[0];
    expect(deleteButton).not.toBeNull('You should have a `button` element');
    expect(deleteButton.textContent).toContain('Delete');

    const resp = new Response(new ResponseOptions());
    const subj = new Subject();
    spyOn(comp.service, 'deleteEventsViews').and.returnValue(subj);
    subj.error(resp);

    spyOn(comp, 'goBackToList');
    deleteButton.dispatchEvent(new Event('click'));
    expect(comp.errorMsg).toEqual('Error deleting events-views');
  });

  it('canDeactivate should return true if no changes where done', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, EventsViewsModule, RouterTestingModule],
      providers: [
        { provide: EventsViewsService, useValue: fakeEventsViewsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteNew }
      ]
    });
    fixture = TestBed.createComponent(EventsViewsFormComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    let ret = comp.canDeactivate();
    fixture.detectChanges();

    expect(ret).toEqual(true);
    expect(comp.pleaseSave).toEqual(false);
  });

  it('canDeactivate should return false if changes where done', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, EventsViewsModule, RouterTestingModule],
      providers: [
        { provide: EventsViewsService, useValue: fakeEventsViewsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteNew }
      ]
    });
    fixture = TestBed.createComponent(EventsViewsFormComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
    const element = fixture.nativeElement;
    const nameInput = element.querySelectorAll('input')[0];
    nameInput.value = 'new name';
    nameInput.dispatchEvent(new Event('input'));

    let ret = comp.canDeactivate();
    fixture.detectChanges();

    expect(ret).toEqual(false);
    expect(comp.pleaseSave).toEqual(true);
  });

  it('should add a new EventsViews and return its new id on sumbit', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, EventsViewsModule, RouterTestingModule],
      providers: [
        { provide: EventsViewsService, useValue: fakeEventsViewsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteNew }
      ]
    });
    fixture = TestBed.createComponent(EventsViewsFormComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    spyOn(comp.service, 'addEventsViews').and.returnValue(Observable.of(1));

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));

    fixture.detectChanges();
    expect(comp.id).toEqual(1);
  });

  it('should display an error message when error occurs on add submit', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, EventsViewsModule, RouterTestingModule],
      providers: [
        { provide: EventsViewsService, useValue: fakeEventsViewsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteNew }
      ]
    });
    fixture = TestBed.createComponent(EventsViewsFormComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    const resp = new Response(new ResponseOptions({ body: 'error !' }));
    const subj = new Subject();
    spyOn(comp.service, 'addEventsViews').and.returnValue(subj);
    subj.error(resp);

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(comp.errorDetails).toEqual('error !');
    expect(comp.errorMsg).toEqual('Error adding events-views');
  });

  it('should update a EventsViews and call goBakctoList on submit', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, EventsViewsModule, RouterTestingModule],
      providers: [
        { provide: EventsViewsService, useValue: fakeEventsViewsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });
    fixture = TestBed.createComponent(EventsViewsFormComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    spyOn(comp.service, 'updateEventsViews').and.returnValue(Observable.of(1));
    spyOn(comp, 'goBackToList');

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));

    fixture.detectChanges();
    expect(comp.goBackToList).toHaveBeenCalled();
  });

  it('should display an error message on when error occurs while submiting form', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, EventsViewsModule, RouterTestingModule],
      providers: [
        { provide: EventsViewsService, useValue: fakeEventsViewsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });
    fixture = TestBed.createComponent(EventsViewsFormComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    const resp = new Response(new ResponseOptions({ body: 'error !' }));
    const subj = new Subject();
    spyOn(comp.service, 'updateEventsViews').and.returnValue(subj);
    subj.error(resp);

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(comp.errorDetails).toEqual('error !');
    expect(comp.errorMsg).toEqual('Error updating events-views');
  });

  it('should should navigate to portal list when gobakctolist function is called', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, EventsViewsModule, RouterTestingModule],
      providers: [
        { provide: EventsViewsService, useValue: fakeEventsViewsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });
    fixture = TestBed.createComponent(EventsViewsFormComponent);
    comp = fixture.componentInstance;
    spyOn(comp.router, 'navigate');
    comp.goBackToList();
    expect(comp.router.navigate).toHaveBeenCalledWith(['/admin/events-views']);
  });
});
