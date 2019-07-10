import {createReducer, on} from '@ngrx/store';
import * as goodActions from '../actions/goods';
import { Good } from '../../models/good.interface';
export interface State {
  goods: Map<number, Good>;
}

export const initialState: State = {
  goods: new Map()
};

export const reducer = createReducer(initialState,
  on(goodActions.add, (state, action) => {
    const newGood: Good = action.payload;
    const goodsMap = state.goods;
    if (newGood.id) {
      // в стейт кладем только элементы, уже сохраненные на сервере, чтобы избежать рассинхрона
      goodsMap.set(newGood.id, newGood);
    }
    return {
      ...state,
      goods: goodsMap
    };
  }),
  on(goodActions.remove, (state, action) => {
    const removedGood = action.payload;
    const goodsMap = state.goods;
    goodsMap.delete(removedGood.id);
    return {
      ...state,
      goods: goodsMap
    };
  }),
);

export const getGoods = (state: State) => state.goods;
export const getGoodsArray = (state: State) => [...state.goods.values()];


