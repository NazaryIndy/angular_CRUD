import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Good } from '../models/good.interface';

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
        case url.match(/\/goods\/\d+$/) && method === 'PUT':
          return updateGood();
        case url.match(/\/goods\/\d+$/) && method === 'DELETE':
          return deleteGood();
        default:
          return next.handle(request);
      }
    }

    function createGood(): Observable<HttpResponse<any>> | Observable<never> {
      const good = body;
      if (goods.find(item => item.title === good.title)) {
        return error('Title "' + goods.title + '" is already taken');
      }
      good.id = goods.length ? Math.max(...goods.map(item => item.id)) + 1 : 1;
      goods.push(good);
      if (goods) {
        localStorage.setItem('goods', JSON.stringify(goods));
      }

      return ok(body);
    }

    function updateGood(): Observable<HttpResponse<any>> {
      const good = body.good;
      const goodId = body.id;
      goods = goods.map((item, index) => {
        if (item.id === goodId) {
          goods[index] = good;
        }
        return goods[index];
      });
      localStorage.setItem('goods', JSON.stringify(goods));
      return ok(good);
    }

    function getGoods(): Observable<HttpResponse<any>> {
      return ok(goods);
    }

    function getGoodById(): Observable<HttpResponse<any>> {
      const good = goods.find(item => item.id === idFromUrl());
      return ok(good);
    }

    function deleteGood(): Observable<HttpResponse<any>> {
      goods = goods.filter(item => item.id !== idFromUrl());
      localStorage.setItem('goods', JSON.stringify(goods));
      return ok();
    }

    // helper functions

    function ok(body?: Good): Observable<HttpResponse<any>> {
      return of(new HttpResponse({ status: 200, body }));
    }

    function error(message): Observable<HttpResponse<any>> {
      return throwError({ error: { message } });
    }

    function idFromUrl(): number {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }
  }
}

export const fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
