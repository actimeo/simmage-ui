import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Response, ResponseOptions } from '@angular/http';

import { AppModule } from '../../../app.module';
import { TopicsModule } from '../topics.module';
import { TopicComponent } from './topic.component';
import { TopicService } from '../../../shared/topic.service';

let comp: TopicComponent;
let fixture: ComponentFixture<TopicComponent>;

class FakeTopicsService {
  loadTopics() {
    return Observable.of([
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
    ]);
  }
  updateTopic() { }
  deleteTopic() { }
  addTopic() { }
}

const fakeTopicsService = new FakeTopicsService();

const fakeActivatedRoute = {
  data: Observable.of({
    'topic': {
      top_id: 5,
      top_name: 'a topic',
      top_description: 'a desc',
      top_icon: 'health'
    }
  }),
  params: Observable.of({})
};

const fakeActivatedRouteNew = {
  data: Observable.of({}),
  params: Observable.of({})
};

describe('TopicComponent', () => {
  beforeEach(() => {
  });

  it('should display topic', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, TopicsModule, RouterTestingModule],
      providers: [
        { provide: TopicService, useValue: fakeTopicsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
      ]
    });
    fixture = TestBed.createComponent(TopicComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    expect(comp.nameCtrl.value).toEqual('a topic');
    expect(comp.descriptionCtrl.value).toEqual('a desc');
  });

  it('should display a new empty topic', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, TopicsModule, RouterTestingModule],
      providers: [
        { provide: TopicService, useValue: fakeTopicsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteNew },
      ]
    });
    fixture = TestBed.createComponent(TopicComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    expect(comp.nameCtrl.value).toEqual('');
    expect(comp.descriptionCtrl.value).toEqual('');
  });

  it('should call doCancel on cancel button click', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, TopicsModule, RouterTestingModule],
      providers: [
        { provide: TopicService, useValue: fakeTopicsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteNew },
      ]
    });
    fixture = TestBed.createComponent(TopicComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    const element = fixture.nativeElement;
    const cancelButton = element.querySelectorAll('button')[0];
    expect(cancelButton).not.toBeNull('You should have a `button` element');
    expect(cancelButton.textContent).toContain('Cancel');

    spyOn(comp, 'doCancel');
    cancelButton.dispatchEvent(new Event('click'));
    expect(comp.doCancel).toHaveBeenCalled();
  });

  it('should call doCancel on cancel button click then call goBackToList()', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, TopicsModule, RouterTestingModule],
      providers: [
        { provide: TopicService, useValue: fakeTopicsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteNew },
      ]
    });
    fixture = TestBed.createComponent(TopicComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    const element = fixture.nativeElement;
    const cancelButton = element.querySelectorAll('button')[0];
    expect(cancelButton).not.toBeNull('You should have a `button` element');
    expect(cancelButton.textContent).toContain('Cancel');

    spyOn(comp, 'goBackToList');
    cancelButton.dispatchEvent(new Event('click'));
    expect(comp.goBackToList).toHaveBeenCalled();
  });

  it('should call doDelete on delete button click', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, TopicsModule, RouterTestingModule],
      providers: [
        { provide: TopicService, useValue: fakeTopicsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
      ]
    });
    fixture = TestBed.createComponent(TopicComponent);
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

  it('should call doDelete on delete button click then call goBackToList()', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, TopicsModule, RouterTestingModule],
      providers: [
        { provide: TopicService, useValue: fakeTopicsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
      ]
    });
    fixture = TestBed.createComponent(TopicComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    const element = fixture.nativeElement;
    const deleteButton = element.querySelectorAll('button')[0];
    expect(deleteButton).not.toBeNull('You should have a `button` element');
    expect(deleteButton.textContent).toContain('Delete');
    spyOn(comp.topicService, 'deleteTopic').and.returnValue(Observable.of(true));
    spyOn(comp, 'goBackToList');
    deleteButton.dispatchEvent(new Event('click'));
    expect(comp.goBackToList).toHaveBeenCalled();
  });

  it('should display error on delete error', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, TopicsModule, RouterTestingModule],
      providers: [
        { provide: TopicService, useValue: fakeTopicsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
      ]
    });
    fixture = TestBed.createComponent(TopicComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    const element = fixture.nativeElement;
    const deleteButton = element.querySelectorAll('button')[0];
    expect(deleteButton).not.toBeNull('You should have a `button` element');
    expect(deleteButton.textContent).toContain('Delete');

    const resp = new Response(new ResponseOptions());
    const subj = new Subject();
    spyOn(comp.topicService, 'deleteTopic').and.returnValue(subj);
    subj.error(resp);

    spyOn(comp, 'goBackToList');
    deleteButton.dispatchEvent(new Event('click'));
    expect(comp.errorMsg).toEqual('Error deleting topic');
  });

  it('canDeactivate should return true if no changes done', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, TopicsModule, RouterTestingModule],
      providers: [
        { provide: TopicService, useValue: fakeTopicsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteNew },
      ]
    });
    fixture = TestBed.createComponent(TopicComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    let ret = comp.canDeactivate();
    fixture.detectChanges();

    expect(ret).toEqual(true);
    expect(comp.pleaseSave).toEqual(false);
  });

  it('canDeactivate should return false if changes done', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, TopicsModule, RouterTestingModule],
      providers: [
        { provide: TopicService, useValue: fakeTopicsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteNew },
      ]
    });
    fixture = TestBed.createComponent(TopicComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
    comp.descriptionCtrl.setValue('a new desc');

    fixture.detectChanges();

    let ret = comp.canDeactivate();
    fixture.detectChanges();

    expect(ret).toEqual(false);
    expect(comp.pleaseSave).toEqual(true);
  });

  it('should add a new topic and return new id on submit', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, TopicsModule, RouterTestingModule],
      providers: [
        { provide: TopicService, useValue: fakeTopicsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteNew },
      ]
    });
    fixture = TestBed.createComponent(TopicComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    spyOn(comp.topicService, 'addTopic').and.returnValue(Observable.of(1));

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));

    fixture.detectChanges();
    expect(comp.id).toEqual(1);
  });

  it('should display error message on submit error on add', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, TopicsModule, RouterTestingModule],
      providers: [
        { provide: TopicService, useValue: fakeTopicsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteNew },
      ]
    });
    fixture = TestBed.createComponent(TopicComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    const resp = new Response(new ResponseOptions({ body: 'error1' }));
    const subj = new Subject();
    spyOn(comp.topicService, 'addTopic').and.returnValue(subj);
    subj.error(resp);

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(comp.errorDetails).toEqual('error1');
    expect(comp.errorMsg).toEqual('Error adding topic');
  });

  it('should update topic and call goBackToList() on submit', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, TopicsModule, RouterTestingModule],
      providers: [
        { provide: TopicService, useValue: fakeTopicsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
      ]
    });
    fixture = TestBed.createComponent(TopicComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    spyOn(comp.topicService, 'updateTopic').and.returnValue(Observable.of(1));
    spyOn(comp, 'goBackToList');
    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));

    fixture.detectChanges();
    expect(comp.goBackToList).toHaveBeenCalled();
  });

  it('should display error message on submit error on update', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, TopicsModule, RouterTestingModule],
      providers: [
        { provide: TopicService, useValue: fakeTopicsService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
      ]
    });
    fixture = TestBed.createComponent(TopicComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    const resp = new Response(new ResponseOptions({ body: 'error1' }));
    const subj = new Subject();
    spyOn(comp.topicService, 'updateTopic').and.returnValue(subj);
    subj.error(resp);

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(comp.errorDetails).toEqual('error1');
    expect(comp.errorMsg).toEqual('Error updating topic');
  });

  it('should navigate to topics list', () => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [AppModule, TopicsModule, RouterTestingModule],
      providers: [
        { provide: TopicService, useValue: fakeTopicsService },
      ]
    });
    fixture = TestBed.createComponent(TopicComponent);
    comp = fixture.componentInstance;
    spyOn(comp.router, 'navigate');
    comp.goBackToList();
    expect(comp.router.navigate).toHaveBeenCalledWith(['/admin/topics']);
  });

});
