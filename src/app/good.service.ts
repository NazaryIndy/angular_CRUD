import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Good } from './models/good.interface';

const URL = 'http://localhost:4200';

@Injectable({
  providedIn: 'root'
})
export class GoodService {

  constructor(private http: HttpClient) { }

  getAll() {
      return this.http.get<Good[]>(`${URL}/goods`);
  }

  getById(id: number) {
      return this.http.get<Good>(`${URL}/goods/${id}`);
  }

  create(good: Good) {
    return this.http.post<Good>(`${URL}/goods/new`, good);
  }

  update(good: Good) {
      return this.http.put<Good>(`${URL}/goods/${good.id}`, good);
  }

  delete(id: number) {
      return this.http.delete<Good>(`${URL}/goods/${id}`);
  }
}
