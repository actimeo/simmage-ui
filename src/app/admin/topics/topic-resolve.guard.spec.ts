/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { TopicResolve } from './topic-resolve.guard';
import { TopicService } from './topic.service';

class FakeTopicService {
  topicsState = Observable.of([
    {
      top_id: 1,
      top_name: 'Topic 1',
      top_description: 'Desc 1'
    }
  ]);
  loadTopic(id: number): any {
    if (id === 1) {
      return Observable.of({
        top_id: id,
        top_name: 'a name',
        top_description: 'a desc'
      });
    } else {
      return Observable.throw('error');
    }
  }
};
const fakeTopicService = new FakeTopicService();

describe('Service: TopicResolve', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        TopicResolve,
        { provide: TopicService, useValue: fakeTopicService },
      ]
    });
  });

  it('should instanciate', inject([TopicResolve], (service: TopicResolve) => {
    expect(service).toBeTruthy();
  }));


  it('should return an observable with a topic', inject([TopicResolve], (service: TopicResolve) => {
    const fakeRoute = new ActivatedRouteSnapshot();
    fakeRoute.params = { id: 1 };
    const res = service.resolve(fakeRoute, null);
    expect(res).toEqual(jasmine.any(Observable), 'resolve should return an Observable');
    res.subscribe(s => expect(s).toEqual({
      top_id: 1,
      top_name: 'a name',
      top_description: 'a desc'
    }, 'resolve should return a topic object'));
  }));

  it('should return a false observable for an unknown id', inject([TopicResolve], (service: TopicResolve) => {
    const fakeRoute = new ActivatedRouteSnapshot();
    fakeRoute.params = { id: 100 };
    spyOn(service.router, 'navigate');

    const res = service.resolve(fakeRoute, null);
    expect(res).toEqual(jasmine.any(Observable), 'resolve should return an Observable');
    res.subscribe(s => expect(s).toEqual(false, 'resolve should return an observabel with a true value'));

    expect(service.router.navigate).toHaveBeenCalledWith(['/admin/topics']);
  }));

});
