import { Component } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { generate, reset } from '../../generate.actions';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent {

  public article: Observable<string>;

  constructor(private store: Store<{ article: string }>) {
    this.article = store.pipe(select('article'));
  }

  public generate() {
    this.store.dispatch(generate());
  }

  public reset() {
    this.store.dispatch(reset());
  }
}
