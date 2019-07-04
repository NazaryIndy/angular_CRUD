import { Action } from '@ngrx/store';
import * as goodAction from '../actions/goods.action';
import { Good } from '../../models';

export interface State {
  ids: number[];
  goods: { [id: number]: Good };
  selected: number;
}

export const initialState: State = {
  ids: [1, 2, 3],
  goods: {
    1: {
      id: 1,
      title: 'Interstellar',
      price: '10',
      weight: '10',
      img: 'https://goo.gl/8mG12t'
    },
    2: {
      id: 2,
      title: 'Shutter Island',
      price: '12',
      weight: '12',
      img: 'https://goo.gl/wfhjUF'
    },
    3: {
      id: 3,
      title: 'The Grand Budapest Hotel',
      price: '13',
      weight: '30',
      img: 'https://goo.gl/8mG12t'
    },
  },
  selected: null,
};

export function reducer(state = initialState, action: goodAction.Action) {
  switch (action.type) {
    case goodAction.ADD_ONE: {
      const newGood: Good = action.payload;
      return {
        ...state,
        ids: [...state.ids, newGood.id],
        goods: { ...state.goods, newGood }
      };
    }

    case goodAction.SELECT: {
      const id = action.payload;
      return {
        ...state,
        selected: id
      };
    }

    default:
      return state;
  }
}

export const getIds = (state: State) => state.ids;
export const getGoods = (state: State) => state.goods;
export const getSelected = (state: State) => state.selected;

