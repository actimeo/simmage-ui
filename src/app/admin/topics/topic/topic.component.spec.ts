import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import  { TopicComponent } from './topic.component';
import { TopicService } from '../../../db-services/topic.service';

let comp: TopicComponent;
let fixture: ComponentFixture<TopicComponent>;
let el: DebugElement;
let topicService: TopicService;

describe('BannerComponent', () => {
  beforeEach(() => {

    const fakeTopicService = {
      isLoggedIn: true,
      user: { name: 'Test User' }
    };

    TestBed.configureTestingModule({
      declarations: [TopicComponent], // declare the test component
      providers: [{ provide: TopicService, useValue: fakeTopicService }]
    });

    fixture = TestBed.createComponent(TopicComponent);

    comp = fixture.componentInstance; // BannerComponent test instance

    topicService = fixture.debugElement.injector.get(TopicService);

    // get title DebugElement by element name
    el = fixture.debugElement.query(By.css('h1'));
  });
});
