/* tslint:disable:no-unused-variable */

import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod,
  Headers, ResponseType } from '@angular/http';
import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { PgService } from './pg.service';

describe('Service: Pg', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, defaultOptions) => new Http(backend, defaultOptions),
          deps: [MockBackend, BaseRequestOptions]
        },
        PgService
      ]
    });
  });

  it('should define a default url base', inject([PgService], (service: PgService) => {
    expect(service).toBeTruthy();

    expect(service.base).toEqual('/pg/', 'default base should be /pg/');
  }));

  it('should return an url base from localStorage', inject([PgService], (service: PgService) => {
    spyOn(window.localStorage, 'getItem');
    service.getBase();
    expect(window.localStorage.getItem).toHaveBeenCalledWith('pg_base');
  }));

  it('should return value from http response', inject([PgService, MockBackend], (service: PgService, mockBackend: MockBackend) => {
    expect(service).toBeTruthy();

    const respValue = { id: 1 };
    // fake response
    const response = new Response(new ResponseOptions({ body: respValue }));
    // return the response if we have a connection to the MockBackend
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url)
        .toBe('/pg/a/path/to/function');
      expect(connection.request.method).toBe(RequestMethod.Post);
      connection.mockRespond(response);
    });

    service.pgcall('a/path/to/function', {})
      .subscribe(res => {
        expect(res).toEqual(respValue, 'respValue should be returned');
      });
  }));


  describe('async', () => {
    let a = 0;

    it('should throw an error on error http response',
      inject([PgService, MockBackend], (service: PgService, mockBackend: MockBackend) => {
        expect(service).toBeTruthy();

        const errorMsg = '* error * insufficient_privilege * error *';
        // fake response
        const resp = new Response(new ResponseOptions(
          {
            body: errorMsg,
            status: 404, headers: new Headers(), type: ResponseType.Error, statusText: 'err',
          }
        ));
        // return the response if we have a connection to the MockBackend
        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url)
            .toBe('/pg/a/path/to/function');
          expect(connection.request.method).toBe(RequestMethod.Post);
          connection.mockError(resp as any);
        });

        service.badTokenEvents.subscribe(res => {
          expect(res).toBe(true);
          a++;
        });

        service.pgcall('a/path/to/function', {})
          .subscribe(
          res => { },
          error => {
            expect(error.text()).toEqual(errorMsg);
            a++;
          });

      }));
    afterEach(function () {
      expect(a).toBe(2);
    });
  });
});
