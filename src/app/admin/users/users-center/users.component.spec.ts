/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import { UsersComponent } from './users.component';
import { AppModule } from '../../../app.module';
import { UsersModule } from '../users.module';
import { UsersService } from '../users.service';

let comp: UsersComponent;
let fixture: ComponentFixture<UsersComponent>;

describe('UsersComponent', () => {

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [AppModule, UsersModule],
      providers: [
      ]
    });
  });

  it('should get list items', () => {
    fixture = TestBed.createComponent(UsersComponent);
    comp = fixture.componentInstance; // test instance
    expect(comp.usersData).not.toBeNull('usersData should not be null');
    expect(comp.usersData).toEqual(jasmine.any(Observable));
  });

});
