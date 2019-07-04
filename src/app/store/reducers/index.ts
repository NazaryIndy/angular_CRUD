import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store';

import * as fromGoods from './goods.reducer';

export interface State {
  goods: fromGoods.State;
}

export const reducers: ActionReducerMap<State> = {
  goods: fromGoods.reducer
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state: State, action: any): State => {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = [logger];

export const getGoodState = createFeatureSelector<fromGoods.State>('goods');

export const getIds = createSelector(
  getGoodState,
  fromGoods.getIds,
);

export const getGoods = createSelector(
  getGoodState,
  fromGoods.getGoods,
);

export const getSelected = createSelector(
  getGoodState,
  fromGoods.getSelected,
);

export const getSelectedGood = createSelector(
  getSelected,
  getGoods,
  (selectedId, goods) => {
    return {
      ...goods[selectedId]
    };
  }
);

export const getAllGoods = createSelector(
  getIds,
  getGoods,
  (ids, goods) => {
    return ids.map(id => goods[id]);
  }
);
