import { Observable } from 'rxjs/Observable';
import { RouterTestingModule } from '@angular/router/testing';
import { Http, Response, ResponseOptions } from '@angular/http';
import { AppModule } from './../../app.module';
import { MaterialModule } from '@angular/material';
import { ComponentFixture } from '@angular/core/testing';
import { TestBed, async } from '@angular/core/testing';
import { SelectIconComponent } from './select-icon.component';
import { DebugElement } from '@angular/core';


class FakeHttpService {
  public get() {
    const resp = new Response(new ResponseOptions({ body: JSON.stringify(['topic1', 'topic2']) }));
    return Observable.of(resp);
  }
}

describe('Component: SelectIcon', () => {

  let comp: SelectIconComponent;
  let fixture: ComponentFixture<SelectIconComponent>;
  //  let de: DebugElement;
  //  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [{ provide: Http, useClass: FakeHttpService }]
    });

    fixture = TestBed.createComponent(SelectIconComponent);

    comp = fixture.componentInstance; // SelectIconComponent test instance

    //    de = fixture.debugElement.query(By.css('h1'));
    //    el = de.nativeElement;
  });

  it('should build', () => {
    fixture.detectChanges();
    comp.open();
  });
});
