import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import {  mergeMap } from 'rxjs/operators';

// array in local storage for registered users
let goods = JSON.parse(localStorage.getItem('goods')) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    return of(null)
    .pipe(handleRoute);

    function handleRoute() {
      switch (true) {
        case url.endsWith('/goods/new') && method === 'POST':
            return createGood();
        case url.endsWith('/goods') && method === 'GET':
            return getGoods();
        case url.match(/\/goods\/\d+$/) && method === 'GET':
            return getGoodById();
        case url.match(/\/goods\/\d+$/) && method === 'DELETE':
            return deleteGood();
        default:
            // pass through any requests not handled above
            return next.handle(request);
      }
    }

    // route functions

    function createGood() {
      const good = body
      if (goods.find(x => x.name === goods.name)) {
          return error('Username "' + goods.name + '" is already taken')
      }
      good.id = goods.length ? Math.max(...goods.map(x => x.id)) + 1 : 1;
      goods.push(good);
      localStorage.setItem('goods', JSON.stringify(goods));

      return ok(body);
    }

    function getGoods() {
      return ok(goods);
    }

    function getGoodById() {
      const good = goods.find(x => x.id == idFromUrl());
      return ok(good);
    }

    function deleteGood() {
      goods = goods.filter(x => x.id !== idFromUrl());
      localStorage.setItem('goods', JSON.stringify(goods));
      return ok();
    }

    // helper functions

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }))
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
