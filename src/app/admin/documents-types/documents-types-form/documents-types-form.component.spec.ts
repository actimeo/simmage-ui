/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Response, ResponseOptions } from '@angular/http';

import { DocumentsTypesFormComponent } from './documents-types-form.component';
import { AppModule } from '../../../app.module';
import { DocumentsTypesModule } from '../documents-types.module';
import { DocumentsTypesService } from '../documents-types.service';
import { TopicService } from '../../..//services/backend/topic.service';
import { OrganService } from '../../../services/backend/organ.service';

let comp: DocumentsTypesFormComponent;
let fixture: ComponentFixture<DocumentsTypesFormComponent>;

class FakeDocumentsTypesService {
  loadDocumentsTypesDetails() {
    return Observable.of([
      {
        documentType: {
          dty_id: 1,
          dty_name: 'a name'
        }, topics: [], organizations: []
      },
      {
        documentType: {
          dty_id: 3,
          dty_name: 'another name'
        }, topics: [], organizations: []
      }
    ]);
  }

  addDocumentsTypes() { }
  deleteDocumentsTypes() { }
  updateDocumentsTypes() { }
}

const fakeDocumentsTypesService = new FakeDocumentsTypesService();

class FakeTopicService {
  loadTopics() {
    return Observable.of([
      {
        top_id: 1,
        top_name: 'a name'
      },
      {
        top_id: 3,
        top_name: 'another name'
      }
    ]);
  }
}

class FakeOrganService {
  loadOrganizations(internal: boolean) {
    return Observable.of([
      {
        org_id: 1,
        org_name: 'a name'
      },
      {
        org_id: 3,
        org_name: 'another name'
      }
    ]);
  }
}

const fakeActivatedRoute = {
  data: Observable.of({
    'documentsTypes': {
        dty_id: 2,
        dty_name: 'this name',
      topics: [],
      organizations: []
    },
  }),
  params: Observable.of({})
};

const fakeActivatedRouteNew = {
  data: Observable.of({}),
  params: Observable.of({})
};

describe('Component: DocumentsTypesForm', () => {
  it('should display DocumentsTypes', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, DocumentsTypesModule, RouterTestingModule],
      providers: [
        { provide: DocumentsTypesService, useValue: fakeDocumentsTypesService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: TopicService, useClass: FakeTopicService },
        { provide: OrganService, useClass: FakeOrganService }
      ]
    });
    fixture = TestBed.createComponent(DocumentsTypesFormComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    expect(comp.nameCtrl.value).toEqual('this name');
  });

  it('should call doCancel when clicking on cancel button', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, DocumentsTypesModule, RouterTestingModule],
      providers: [
        { provide: DocumentsTypesService, useValue: fakeDocumentsTypesService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteNew },
        { provide: TopicService, useClass: FakeTopicService },
        { provide: OrganService, useClass: FakeOrganService }
      ]
    });
    fixture = TestBed.createComponent(DocumentsTypesFormComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
    const element = fixture.nativeElement;
    const cancelButton = element.querySelectorAll('button')[3];
    expect(cancelButton).not.toBeNull('You should have a `button` element');
    expect(cancelButton.textContent).toContain('Cancel');

    spyOn(comp, 'doCancel');
    cancelButton.dispatchEvent(new Event('click'));
    expect(comp.doCancel).toHaveBeenCalled();
  });

  it('should call doCancel then goBacktoList when clicking on cancel button', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, DocumentsTypesModule, RouterTestingModule],
      providers: [
        { provide: DocumentsTypesService, useValue: fakeDocumentsTypesService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteNew },
        { provide: TopicService, useClass: FakeTopicService },
        { provide: OrganService, useClass: FakeOrganService }
      ]
    });
    fixture = TestBed.createComponent(DocumentsTypesFormComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    const element = fixture.nativeElement;
    const cancelButton = element.querySelectorAll('button')[3];
    expect(cancelButton).not.toBeNull('You should have a `button` element');
    expect(cancelButton.textContent).toContain('Cancel');

    spyOn(comp, 'goBackToList');
    cancelButton.dispatchEvent(new Event('click'));
    expect(comp.goBackToList).toHaveBeenCalled();
  });

  it('should call doDelete when clicking on delete button', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, DocumentsTypesModule, RouterTestingModule],
      providers: [
        { provide: DocumentsTypesService, useValue: fakeDocumentsTypesService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: TopicService, useClass: FakeTopicService },
        { provide: OrganService, useClass: FakeOrganService }
      ]
    });
    fixture = TestBed.createComponent(DocumentsTypesFormComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    const element = fixture.nativeElement;
    const deleteButton = element.querySelectorAll('button')[2];
    expect(deleteButton).not.toBeNull('You should have a `button` element');
    expect(deleteButton.textContent).toContain('Delete');

    spyOn(comp, 'doDelete');
    deleteButton.dispatchEvent(new Event('click'));
    expect(comp.doDelete).toHaveBeenCalled();
  });

  it('should call doDelete then goBackToList when clicking on delete button', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, DocumentsTypesModule, RouterTestingModule],
      providers: [
        { provide: DocumentsTypesService, useValue: fakeDocumentsTypesService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: TopicService, useClass: FakeTopicService },
        { provide: OrganService, useClass: FakeOrganService }
      ]
    });
    fixture = TestBed.createComponent(DocumentsTypesFormComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    const element = fixture.nativeElement;
    const deleteButton = element.querySelectorAll('button')[2];
    expect(deleteButton).not.toBeNull('You should have a `button` element');
    expect(deleteButton.textContent).toContain('Delete');

    spyOn(comp.service, 'deleteDocumentsTypes').and.returnValue(Observable.of(true));
    spyOn(comp, 'goBackToList');
    deleteButton.dispatchEvent(new Event('click'));
    expect(comp.goBackToList).toHaveBeenCalled();
  });

  it('should display error on delete error', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, DocumentsTypesModule, RouterTestingModule],
      providers: [
        { provide: DocumentsTypesService, useValue: fakeDocumentsTypesService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: TopicService, useClass: FakeTopicService },
        { provide: OrganService, useClass: FakeOrganService }
      ]
    });
    fixture = TestBed.createComponent(DocumentsTypesFormComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    const element = fixture.nativeElement;
    const deleteButton = element.querySelectorAll('button')[2];
    expect(deleteButton).not.toBeNull('You should have a `button` element');
    expect(deleteButton.textContent).toContain('Delete');

    const resp = new Response(new ResponseOptions());
    const subj = new Subject();
    spyOn(comp.service, 'deleteDocumentsTypes').and.returnValue(subj);
    subj.error(resp);

    spyOn(comp, 'goBackToList');
    deleteButton.dispatchEvent(new Event('click'));
    expect(comp.errorMsg).toEqual('Error deleting documents-types');
  });

  it('canDeactivate should return true if no changes where done', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, DocumentsTypesModule, RouterTestingModule],
      providers: [
        { provide: DocumentsTypesService, useValue: fakeDocumentsTypesService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteNew },
        { provide: TopicService, useClass: FakeTopicService },
        { provide: OrganService, useClass: FakeOrganService }
      ]
    });
    fixture = TestBed.createComponent(DocumentsTypesFormComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    let ret = comp.canDeactivate();
    fixture.detectChanges();

    expect(ret).toEqual(true);
    expect(comp.pleaseSave).toEqual(false);
  });

  it('canDeactivate should return false if changes where done', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, DocumentsTypesModule, RouterTestingModule],
      providers: [
        { provide: DocumentsTypesService, useValue: fakeDocumentsTypesService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteNew },
        { provide: TopicService, useClass: FakeTopicService },
        { provide: OrganService, useClass: FakeOrganService }
      ]
    });
    fixture = TestBed.createComponent(DocumentsTypesFormComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
    const element = fixture.nativeElement;
    const nameInput = element.querySelectorAll('input')[0];
    nameInput.value = 'new name';
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    let ret = comp.canDeactivate();

    expect(ret).toEqual(false);
    expect(comp.pleaseSave).toEqual(true);
  });

  it('should add a new DocumentsTypes and return its new id on sumbit', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, DocumentsTypesModule, RouterTestingModule],
      providers: [
        { provide: DocumentsTypesService, useValue: fakeDocumentsTypesService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteNew },
        { provide: TopicService, useClass: FakeTopicService },
        { provide: OrganService, useClass: FakeOrganService }
      ]
    });
    fixture = TestBed.createComponent(DocumentsTypesFormComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    spyOn(comp.service, 'addDocumentsTypes').and.returnValue(Observable.of(1));

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));

    fixture.detectChanges();
    expect(comp.id).toEqual(1);
  });

  it('should display an error message when error occurs on add submit', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, DocumentsTypesModule, RouterTestingModule],
      providers: [
        { provide: DocumentsTypesService, useValue: fakeDocumentsTypesService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteNew },
        { provide: TopicService, useClass: FakeTopicService },
        { provide: OrganService, useClass: FakeOrganService }
      ]
    });
    fixture = TestBed.createComponent(DocumentsTypesFormComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    const resp = new Response(new ResponseOptions({ body: 'error !' }));
    const subj = new Subject();
    spyOn(comp.service, 'addDocumentsTypes').and.returnValue(subj);
    subj.error(resp);

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(comp.errorDetails).toEqual('error !');
    expect(comp.errorMsg).toEqual('Error adding documents-types');
  });

  it('should update a DocumentsTypes and call goBakctoList on submit', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, DocumentsTypesModule, RouterTestingModule],
      providers: [
        { provide: DocumentsTypesService, useValue: fakeDocumentsTypesService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: TopicService, useClass: FakeTopicService },
        { provide: OrganService, useClass: FakeOrganService }
      ]
    });
    fixture = TestBed.createComponent(DocumentsTypesFormComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    spyOn(comp.service, 'updateDocumentsTypes').and.returnValue(Observable.of(1));
    spyOn(comp, 'goBackToList');

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));

    fixture.detectChanges();
    expect(comp.goBackToList).toHaveBeenCalled();
  });

  it('should display an error message on when error occurs while submiting form', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, DocumentsTypesModule, RouterTestingModule],
      providers: [
        { provide: DocumentsTypesService, useValue: fakeDocumentsTypesService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: TopicService, useClass: FakeTopicService },
        { provide: OrganService, useClass: FakeOrganService }
      ]
    });
    fixture = TestBed.createComponent(DocumentsTypesFormComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    const resp = new Response(new ResponseOptions({ body: 'error !' }));
    const subj = new Subject();
    spyOn(comp.service, 'updateDocumentsTypes').and.returnValue(subj);
    subj.error(resp);

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(comp.errorDetails).toEqual('error !');
    expect(comp.errorMsg).toEqual('Error updating documents-types');
  });

  it('should should navigate to portal list when gobakctolist function is called', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, DocumentsTypesModule, RouterTestingModule],
      providers: [
        { provide: DocumentsTypesService, useValue: fakeDocumentsTypesService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: TopicService, useClass: FakeTopicService },
        { provide: OrganService, useClass: FakeOrganService }
      ]
    });
    fixture = TestBed.createComponent(DocumentsTypesFormComponent);
    comp = fixture.componentInstance;
    spyOn(comp.router, 'navigate');
    comp.goBackToList();
    expect(comp.router.navigate).toHaveBeenCalledWith(['/admin/documents-types']);
  });
});
