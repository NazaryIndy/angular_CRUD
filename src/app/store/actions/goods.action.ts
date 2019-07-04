import { Action } from '@ngrx/store';
import { Good } from '../../models';

export const SELECT = '[Goods] Select';
export const ADD_ONE = '[Goods] Add One';

export class Select implements Action {
  readonly type = SELECT;

  constructor(public payload: number) { }
}

export class AddOne implements Action {
  readonly type = ADD_ONE;

  constructor(public payload: Good) { }
}

export type Action = AddOne | Select;
