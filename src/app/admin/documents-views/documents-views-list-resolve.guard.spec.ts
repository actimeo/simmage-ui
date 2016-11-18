/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DocumentsViewsListResolve } from './documents-views-list-resolve.guard';
import { AppModule } from '../../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRouteSnapshot, UrlSegment } from '@angular/router';
import { DocumentsViewsService } from './documents-views.service';
import { Observable } from 'rxjs/Observable';

class FakeDocumentsViewsService {
	loadDocumentsViews() {
		return Observable.of([
			{
				dov_id: 1,
				dov_name: 'document-view 1',
				dty_id: 1,
				top_ids: []
			},
			{
				dov_id: 2,
				dov_name: 'document-view 2',
				dty_id: 2,
				top_ids: []
			}
		]);
	}
}

const fakeDocumentsViewsService = new FakeDocumentsViewsService();

const fakeRouter = jasmine.createSpyObj('Router', ['navigate']);

describe('Service: DocumentsViewsListResolve', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [AppModule, RouterTestingModule],
			providers: [
				DocumentsViewsListResolve,
				{ provide: DocumentsViewsService, useValue: fakeDocumentsViewsService },
				{ provide: Router, useValue: fakeRouter }
			]
		});
	});

	it('should return an observable with a list of documents-views', inject([DocumentsViewsListResolve], (service: DocumentsViewsListResolve) => {
		const fakeActivatedRoute = new ActivatedRouteSnapshot();
		const res = service.resolve(fakeActivatedRoute, null);
		expect(res).toEqual(jasmine.any(Observable), 'resolve should return an observable');
		res.subscribe(s => {
			expect(s.length).toEqual(2, 'resolve should return a list of 2 documents-views objects');
		});
	}));
});