/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DocumentsTypesListResolve } from './documents-types-list-resolve.guard';
import { AppModule } from '../../app.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRouteSnapshot, UrlSegment } from '@angular/router';
import { DocumentsTypesService } from './documents-types.service';
import { TopicService } from '../../shared/topic.service';
import { OrganService } from '../../shared/organ.service';
import { Observable } from 'rxjs/Observable';

class FakeDocumentsTypesService {
  loadDocumentsTypes(): any {
    return Observable.of([
			{
				documentType: 
					{
						dty_id: 1,
						dty_name: 'a name',
						dty_individual_name: true,
						top_ids: [1, 3, 5],
						org_ids: [1, 2]
					},
				topics: [],
				organizations: []
			},
			{
				documentType:
					{
						dty_id: 2,
						dty_name: 'another name',
						dty_individual_name: true,
						top_ids: [1, 2, 4],
						org_ids: [1, 3]
					},
				topics: [],
				organizations: []
			}
		]);
  }
};

class FakeOrganService {
	loadOrganizations(bool: boolean) {
		return Observable.of([
			{
				org_id: 1,
				org_name: 'organ 1'
			},
			{
				org_id: 2,
				org_name: 'organ 2'
			},
			{
				org_id: 3,
				org_name: 'organ 3'
			}
		]);
	}
}

class FakeTopicService {
	loadTopics() {
		return Observable.of([
			{
				top_id: 1,
				top_name: 'topic 1'
			},
			{
				top_id: 2,
				top_name: 'topic 2'
			},
			{
				top_id: 3,
				top_name: 'topic 3'
			},
			{
				top_id: 4,
				top_name: 'topic 4'
			},
			{
				top_id: 5,
				top_name: 'topic 5'
			},
		]);
	}
}

const fakeDocumentsTypesService = new FakeDocumentsTypesService();
const fakeTopicService = new FakeTopicService();
const fakeOrganService = new FakeOrganService();

const fakeRouter = jasmine.createSpyObj('Router', ['navigate']);

describe('Service: DocumentsTypesListResolve', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [
        DocumentsTypesListResolve,
        { provide: DocumentsTypesService, useValue: fakeDocumentsTypesService },
				{ provide: TopicService, useValue: fakeTopicService },
				{ provide: OrganService, useValue: fakeOrganService },
        { provide: Router, useValue: fakeRouter }
      ]
    });
  });

  it('should return an observable with a list of documents-types', inject([DocumentsTypesListResolve], (service: DocumentsTypesListResolve) => {

    const fakeActivatedRoute = new ActivatedRouteSnapshot();
    const res = service.resolve(fakeActivatedRoute, null);
    expect(res).toEqual(jasmine.any(Observable), 'resolve should return an observable');
    res.subscribe(s => {
			expect(s.documentsTypes.length).toEqual(2, 'resolve should return a list of 2 documents-types objects');
		});
  }));
});
