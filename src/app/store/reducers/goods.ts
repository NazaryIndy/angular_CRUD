import {createReducer, on} from '@ngrx/store';
import * as goodActions from '../actions/goods';
import { Good } from '../../models/good.interface';
export interface State {
  goods: Map<number, Good>;
  allLoaded: boolean;
}

export const initialState: State = {
  goods: new Map(),
  allLoaded: false
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
    const removedId = action.payload;
    const goodsMap = state.goods;
    goodsMap.delete(removedId);
    return {
      ...state,
      goods: goodsMap
    };
  }),
  on(goodActions.addAll, (state, action) => {
    const goods = action.payload;
    const goodsMap = new Map();
    for (const good of goods) {
      if (good.id) {
        goodsMap.set(good.id, good);
      }
    }
    return {
      ...state,
      goods: goodsMap,
      allLoaded: true
    };
  }),
);

export const getGoods = (state: State) => state.goods;
export const isAllLoaded = (state: State) => state.allLoaded;
export const getGoodsArray = (state: State) => [...state.goods.values()];


