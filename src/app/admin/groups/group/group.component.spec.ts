/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Response, ResponseOptions } from '@angular/http';

import { GroupComponent } from './group.component';
import { AppModule } from '../../../app.module';
import { GroupsModule } from '../groups.module';
import { GroupService } from '../group.service';

let comp: GroupComponent;
let fixture: ComponentFixture<GroupComponent>;

class FakeGroupService {
  loadGroups() {
    return Observable.of([
      {
        grp_id: 1,
        grp_name: 'Group 1',
        grp_description: 'Description 1'
      },
      {
        grp_id: 3,
        grp_name: 'Group 3',
        grp_description: 'Description 3'
      }
    ]);
  }

  addGroup() { }
  deleteGroup() { }
  updateGroup() { }

  loadGroup() { }
  loadOrganizations() {
    return Observable.of([{ }]);
  }
  loadTopics() {
    return Observable.of([{ }]);
  }
  setTopics() { }
}

const fakeGroupService = new FakeGroupService();

const fakeActivatedRoute = {
  data: Observable.of({
    'group' : {
      group : {
        grp_id: 2,
        grp_name: 'group 2',
        grp_description: 'description 2'
      },
      topics: [
        {
          top_id: 1,
          top_name: 'topic 1',
          top_description: 'top desc 1'
        },
        {
          top_id: 5,
          top_name: 'topic 5',
          top_description: 'top desc 5'
        }
      ]
    }
  }),
  params: Observable.of({})
};

const fakeActivatedRouteNew = {
  data: Observable.of({}),
  params: Observable.of({})
};

describe('Component: Group', () => {
  it('should display a group', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, GroupsModule, RouterTestingModule],
      providers: [
        { provide: GroupService, useValue: fakeGroupService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(GroupComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    expect(comp.nameCtrl.value).toEqual('group 2');
    expect(comp.descriptionCtrl.value).toEqual('description 2');
  });

  it('should call doCancel when click on cancel button', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, GroupsModule, RouterTestingModule],
      providers: [
        { provide: GroupService, useValue: fakeGroupService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteNew }
      ]
    });

    fixture = TestBed.createComponent(GroupComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
    const element = fixture.nativeElement;
    const cancelButton = element.querySelectorAll('button')[2];
    expect(cancelButton).not.toBeNull('You should have a button element');
    expect(cancelButton.textContent).toContain('Cancel');

    spyOn(comp, 'doCancel');
    cancelButton.dispatchEvent(new Event('click'));
    expect(comp.doCancel).toHaveBeenCalled();
  });

  it('should call doCancel then goBacktolist when clicking on cancel button', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, GroupsModule, RouterTestingModule],
      providers: [
        { provide: GroupService, useValue: fakeGroupService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteNew }
      ]
    });

    fixture = TestBed.createComponent(GroupComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
    const element = fixture.nativeElement;
    const cancelButton = element.querySelectorAll('button')[2];
    expect(cancelButton).not.toBeNull('You should have a button element');
    expect(cancelButton.textContent).toContain('Cancel');

    spyOn(comp, 'goBackToList');
    cancelButton.dispatchEvent(new Event('click'));
    expect(comp.goBackToList).toHaveBeenCalled();
  });

  it('should call doDelete when clicking on delete button', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, GroupsModule, RouterTestingModule],
      providers: [
        { provide: GroupService, useValue: fakeGroupService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(GroupComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
    const element = fixture.nativeElement;
    const deleteButton = element.querySelectorAll('button')[1];
    expect(deleteButton).not.toBeNull('You should have a button element');
    expect(deleteButton.textContent).toContain('Delete');

    spyOn(comp, 'doDelete');
    deleteButton.dispatchEvent(new Event('click'));
    expect(comp.doDelete).toHaveBeenCalled();
  });

  it('should remove group topics before trying to delete the group', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, GroupsModule, RouterTestingModule],
      providers: [
        { provide: GroupService, useValue: fakeGroupService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(GroupComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
    const element = fixture.nativeElement;
    const deleteButton = element.querySelectorAll('button')[1];
    expect(deleteButton).not.toBeNull('You should have a button element');
    expect(deleteButton.textContent).toContain('Delete');

    spyOn(comp.gs, 'setTopics').and.returnValue(Observable.of(true));
    spyOn(comp.gs, 'deleteGroup').and.returnValue(Observable.of(true));

    deleteButton.dispatchEvent(new Event('click'));
    expect(comp.gs.deleteGroup).toHaveBeenCalled();
  });

  it('should display error message on topics delete error', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, GroupsModule, RouterTestingModule],
      providers: [
        { provide: GroupService, useValue: fakeGroupService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(GroupComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
    const element = fixture.nativeElement;
    const deleteButton = element.querySelectorAll('button')[1];
    expect(deleteButton).not.toBeNull('You should have a button element');
    expect(deleteButton.textContent).toContain('Delete');

    const resp = new Response(new ResponseOptions());
    const subj = new Subject();
    spyOn(comp.gs, 'setTopics').and.returnValue(subj);
    subj.error(resp);

    deleteButton.dispatchEvent(new Event('click'));
    expect(comp.errorMsg).toEqual('Error while removing all topics linked to the group');
  });

  it('should display error message on delete error', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, GroupsModule, RouterTestingModule],
      providers: [
        { provide: GroupService, useValue: fakeGroupService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });

    fixture = TestBed.createComponent(GroupComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
    const element = fixture.nativeElement;
    const deleteButton = element.querySelectorAll('button')[1];
    expect(deleteButton).not.toBeNull('You should have a button element');
    expect(deleteButton.textContent).toContain('Delete');

    spyOn(comp.gs, 'setTopics').and.returnValue(Observable.of(true));
    const resp = new Response(new ResponseOptions());
    const subj = new Subject();
    spyOn(comp.gs, 'deleteGroup').and.returnValue(subj);
    subj.error(resp);

    deleteButton.dispatchEvent(new Event('click'));
    expect(comp.errorMsg).toEqual('Error while deleting a group');
  });

  it('canDeactivate should return true if no changes where done', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, GroupsModule, RouterTestingModule],
      providers: [
        { provide: GroupService, useValue: fakeGroupService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteNew }
      ]
    });
    fixture = TestBed.createComponent(GroupComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    const ret = comp.canDeactivate();
    fixture.detectChanges();

    expect(ret).toEqual(true);
    expect(comp.pleaseSave).toEqual(false);
  });

  it('canDeactivate should return false if changes where done', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, GroupsModule, RouterTestingModule],
      providers: [
        { provide: GroupService, useValue: fakeGroupService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteNew }
      ]
    });
    fixture = TestBed.createComponent(GroupComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();
    const element = fixture.nativeElement;
    const descInput = element.querySelectorAll('input')[1];
    descInput.value = 'new desc';
    descInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const ret = comp.canDeactivate();

    expect(ret).toEqual(false);
    expect(comp.pleaseSave).toEqual(true);
  });

  it('should add a new group, link topics to it, and return its new id on submit', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, GroupsModule, RouterTestingModule],
      providers: [
        { provide: GroupService, useValue: fakeGroupService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteNew }
      ]
    });
    fixture = TestBed.createComponent(GroupComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    spyOn(comp.gs, 'addGroup').and.returnValue(Observable.of(1));
    spyOn(comp.gs, 'setTopics').and.returnValue(Observable.of(true));

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));

    fixture.detectChanges();
    expect(comp.id).toEqual(1);
  });

  it('should update a group and its topics on submit', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, GroupsModule, RouterTestingModule],
      providers: [
        { provide: GroupService, useValue: fakeGroupService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });
    fixture = TestBed.createComponent(GroupComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    spyOn(comp.gs, 'updateGroup').and.returnValue(Observable.of(true));
    spyOn(comp.gs, 'setTopics').and.returnValue(Observable.of(true));

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));

    fixture.detectChanges();
    expect(comp.id).toEqual(2);
  });

  it('should display an error message when error occurs on add submit', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, GroupsModule, RouterTestingModule],
      providers: [
        { provide: GroupService, useValue: fakeGroupService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteNew }
      ]
    });
    fixture = TestBed.createComponent(GroupComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    const resp = new Response(new ResponseOptions({ body: 'error !' }));
    const subj = new Subject();
    spyOn(comp.gs, 'addGroup').and.returnValue(subj);
    subj.error(resp);

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(comp.errorDetails).toEqual('error !');
    expect(comp.errorMsg).toEqual('Error occured while adding a group');
  });

  it('should display an error message when error occurs on topics add part submit', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, GroupsModule, RouterTestingModule],
      providers: [
        { provide: GroupService, useValue: fakeGroupService },
        { provide: ActivatedRoute, useValue: fakeActivatedRouteNew }
      ]
    });
    fixture = TestBed.createComponent(GroupComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    spyOn(comp.gs, 'addGroup').and.returnValue(Observable.of(1));

    const resp = new Response(new ResponseOptions({ body: 'error !' }));
    const subj = new Subject();
    spyOn(comp.gs, 'setTopics').and.returnValue(subj);
    subj.error(resp);

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(comp.errorDetails).toEqual('error !');
    expect(comp.errorMsg).toEqual('Error occured while saving the topics linked to the group');
  });

  it('should display an error message when error occurs on update submit', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, GroupsModule, RouterTestingModule],
      providers: [
        { provide: GroupService, useValue: fakeGroupService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });
    fixture = TestBed.createComponent(GroupComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    const resp = new Response(new ResponseOptions({ body: 'error !' }));
    const subj = new Subject();
    spyOn(comp.gs, 'updateGroup').and.returnValue(subj);
    subj.error(resp);

    fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(comp.errorDetails).toEqual('error !');
    expect(comp.errorMsg).toEqual('Error while updating a group');
  });

  it('should navigate back to group list when gobacktolist is called', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, GroupsModule, RouterTestingModule],
      providers: [
        { provide: GroupService, useValue: fakeGroupService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });
    fixture = TestBed.createComponent(GroupComponent);
    comp = fixture.componentInstance;

    spyOn(comp.router, 'navigate');
    comp.goBackToList();
    expect(comp.router.navigate).toHaveBeenCalledWith(['/admin/groups']);
  });
});
