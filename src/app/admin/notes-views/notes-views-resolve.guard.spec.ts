/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NotesViewsResolve } from './notes-views-resolve.guard';
import { AppModule } from '../../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRouteSnapshot, UrlSegment } from '@angular/router';
import { NotesViewsService } from './notes-views.service';
import { Observable } from 'rxjs/Observable';

class FakeNotesViewsService {
  getNotesViews(id: number): any {
    if (id === 1) {
      return Observable.of({
        // TODO : create an object of type NotesViews
      });
    } else {
      return Observable.throw('error');
    }
  }
};

const fakeNotesViewsService = new FakeNotesViewsService();

const fakeRouter = jasmine.createSpyObj('Router', ['navigate']);

describe('Service: NotesViewsResolve', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [
        NotesViewsResolve,
        { provide: NotesViewsService, useValue: fakeNotesViewsService },
        { provide: Router, useValue: fakeRouter }
      ]
    });
  });

  it('should return an observable with notes-views', inject([NotesViewsResolve], (service: NotesViewsResolve) => {

    const fakeActivatedRoute = new ActivatedRouteSnapshot();
    fakeActivatedRoute.params = { id: 1 };
    const res = service.resolve(fakeActivatedRoute, null);
    expect(res).toEqual(jasmine.any(Observable), 'resolve should return an observable');
    res.subscribe(s => expect(s).toEqual({
      // TODO : this object should match the one defined in the FakeNotesViewsService above
    }, 'resolve should return notes-views object'));
  }));

  it('should navigate back to /admin/notes-views if an error occurs when trying to load the notes-views',
    inject([NotesViewsResolve], (service: NotesViewsResolve) => {
    const fakeActivatedRoute = new ActivatedRouteSnapshot();
    fakeActivatedRoute.params = { id: 3 };

    const res = service.resolve(fakeActivatedRoute, null);
    expect(res).toEqual(jasmine.any(Observable), 'resolve should return an observable');
    res.subscribe(s => expect(s).toEqual(false, 'resolve should return an observable with false as value'));

    expect(fakeRouter.navigate).toHaveBeenCalledWith(['/admin/notes-views']);
  }));
});
