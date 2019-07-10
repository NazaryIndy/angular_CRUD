import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Good } from '../models/good.interface';
import {Observable, of} from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../store/reducers';
import * as goodActions from '../store/actions/goods';
import {switchMap} from 'rxjs/operators';

const URL = 'http://localhost:4200';

@Injectable({
  providedIn: 'root'
})
export class GoodService {

  constructor(private http: HttpClient, private store: Store<fromRoot.State>) {
  }

  public getAll(): Observable<Array<Good>> {
    return this.store.select(fromRoot.isAllLoaded).pipe(switchMap((isAllLoaded) => {
      if (isAllLoaded) {
        return this.store.select(fromRoot.getGoodsAsArray);
      } else {
        return this.http.get<Array<Good>>(`${URL}/goods`);
      }
    }));
  }

  public getById(id: number): Observable<Good> {
    return this.store.select(fromRoot.getGoodById, id).pipe(switchMap(aGood => {
      return aGood ? of(aGood) : this.http.get<Good>(`${URL}/goods/${id}`);
    }));
  }

  public create(good: Good): Observable<Good> {
    return this.http.post<Good>(`${URL}/goods/new`, good).pipe(switchMap(aGood => {
      this.store.dispatch(goodActions.add(aGood));
      return of(aGood);
    }));
  }

  public update(good: Good, id: number): Observable<Good> {
    return this.http.put<Good>(`${URL}/goods/${good.id}`, {good, id}).pipe(switchMap(aGood => {
      this.store.dispatch(goodActions.add(aGood));
      return of(aGood);
    }));
  }

  public delete(id: number): Observable<Good> {
    return this.http.delete<Good>(`${URL}/goods/${id}`).pipe(switchMap(aGood => {
      this.store.dispatch(goodActions.remove(id));
      return of(aGood);
    }));
  }

}
