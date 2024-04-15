import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItemsState } from './items.state';
import { itemsFeatureKey } from './items.reducer';

const _getState = createFeatureSelector<ItemsState>(itemsFeatureKey);

export const getItems = createSelector(_getState, state => state.items);
export const getTimestamp = createSelector(_getState, state => state.timestamp);

