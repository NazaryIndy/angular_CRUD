import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Good } from '../models/good.interface';
import { Observable } from 'rxjs';

const URL = 'http://localhost:4200';

@Injectable({
  providedIn: 'root'
})
export class GoodService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Array<Good>> {
    return this.http.get<Array<Good>>(`${URL}/goods`);
  }

  public getById(id: number): Observable<Good> {
    return this.http.get<Good>(`${URL}/goods/${id}`);
  }

  public create(good: Good): Observable<Good> {
    return this.http.post<Good>(`${URL}/goods/new`, good);
  }

  public update(good: Good, id: number): Observable<Good> {
    return this.http.put<Good>(`${URL}/goods/${good.id}`, {good, id});
  }

  public delete(id: number): Observable<Good> {
    return this.http.delete<Good>(`${URL}/goods/${id}`);
  }
}
