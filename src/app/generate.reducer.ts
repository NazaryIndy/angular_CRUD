import { createReducer, on } from '@ngrx/store';
import { generate, reset } from './generate.actions';

export const initialState = 'AAAAA';

export const makeid = (): string => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i <= 5; i++) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const generateReducer = createReducer(initialState,
  on(generate, state => makeid()),
  on(reset, state => 'AAAAA'),
);
