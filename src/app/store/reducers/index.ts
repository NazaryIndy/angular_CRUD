import { ActionReducerMap, createSelector, createFeatureSelector,
  ActionReducer, MetaReducer } from '@ngrx/store';
import * as fromGoods from './goods';
export interface State {
  films: fromGoods.State;
}
export const reducers: ActionReducerMap<State> = {
  films: fromGoods.reducer
};

export const getGoodState = createFeatureSelector<fromGoods.State>('films');

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

