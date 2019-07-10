
import { Good } from '../../models/good.interface';
import { createAction } from '@ngrx/store';

export const ADD = '[Goods] add';
export const REMOVE = '[Goods] delete';

// class Add implements Action {
//   type = ADD;
//   constructor(public payload: Good) { }
// }
//
// class Delete implements Action {
//   type = DELETE;
//   constructor(public payload: Good) { }
// }

export const add = createAction(ADD, (payload: Good) => ({payload}));

export const remove = createAction(REMOVE, (payload: Good) => ({payload}));

