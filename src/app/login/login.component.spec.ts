/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';

import { LoginComponent } from './login.component';
import { AppModule } from '../app.module';

let comp: LoginComponent;
let fixture: ComponentFixture<LoginComponent>;

let fakeActivatedRoute = {
  params: Observable.of({ 'lang': 'fr' })
};

describe('Component: Login', () => {

  it('should instantiate with default lang en', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [
      ]
    });
    window.localStorage.removeItem('lang');
    fixture = TestBed.createComponent(LoginComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges();

    expect(comp.activeLang).toEqual('en', 'default language should be en');
  });

  it('should instantiate with a new lang as param', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    });


    fixture = TestBed.createComponent(LoginComponent);
    comp = fixture.componentInstance;
    spyOn(comp, 'setLangAndRestart');

    fixture.detectChanges();

    //    expect(comp.activeLang).toEqual('fr', 'language should be set to fr');
    expect(comp.setLangAndRestart).toHaveBeenCalled();
  });

  it('should login and navigate to /', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [
      ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(comp.user, 'login').and.returnValue(Observable.of(true));
    spyOn(comp.router, 'navigate');

    const element = fixture.nativeElement;
    const form = element.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(comp.router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should not login and display a message', () => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [
      ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(comp.user, 'login').and.returnValue(Observable.throw('error'));


    const element = fixture.nativeElement;
    let alerts = fixture.debugElement.queryAll(By.css('.alert'));
    expect(alerts.length).toEqual(0, 'message should not be visible');

    const form = element.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(comp.invalidLogin).toEqual(true);
    alerts = fixture.debugElement.queryAll(By.css('.alert'));
    expect(alerts.length).toEqual(1, 'message should be visible');
  });

});
