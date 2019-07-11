import { Good } from '../../models/good.interface';
import { createAction } from '@ngrx/store';

export const ADD = '[Goods] add';
export const ADD_ALL = '[Goods] add all';
export const REMOVE = '[Goods] delete';

export const add = createAction(ADD, (payload: Good) => ({payload}));

export const addAll = createAction(ADD_ALL, (payload: Good[]) => ({payload}));

export const remove = createAction(REMOVE, (payload: number) => ({payload}));

