import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';
import * as fromGoods from './goods';

export interface State {
  goods: fromGoods.State;
}

export const reducers: ActionReducerMap<State> = {
  goods: fromGoods.reducer,
};

export const getGoodState = createFeatureSelector<fromGoods.State>('goods');

export const isAllLoaded = createSelector(
  getGoodState,
  fromGoods.isAllLoaded
);

export const getGoods = createSelector(
  getGoodState,
  fromGoods.getGoods,
);

export const getGoodsAsArray = createSelector(
  getGoodState,
  fromGoods.getGoodsArray
);

export const getGoodById = createSelector(
  getGoods,
  (id, goods) => {
    return {
      ...goods[id]
    };
  }
);

