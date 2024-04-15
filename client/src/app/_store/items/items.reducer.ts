import { ItemsState } from './items.state';
import { createReducer, on } from '@ngrx/store';
import { ItemsActions } from './items.actions';
import { isDefined } from '#core/utils';

const initState: ItemsState = {
  items: undefined,
  timestamp: undefined,
};

export const itemsFeatureKey = 'items';

export const itemsReducer = createReducer(
  initState,

  on(ItemsActions.uncheckAll, state => ({
    ...state,
    items: state.items.map(i => ({ ...i, isChecked: false })),
  })),

  on(ItemsActions.updateItem, (state, action) => {
    const items = state.items.map(i => i.id === action.item.id ? { ...i, ...action.item } : i);
    return {
      ...state,
      items,
    }
  }),

  on(ItemsActions.loadItemsSuccess, (state, action) => {
    let items = action.res.payload;

    if (isDefined(state.items)) {
      items = state.items?.map(i => {
        const item = action.res.payload.find(t => t.id === i.id);
        return {
          ...item,
          isChecked: i?.isChecked || false,
        }
      })
    }
    return {
      ...state,
      items,
      timestamp: action.res.timestamp,
    }
  })
)
