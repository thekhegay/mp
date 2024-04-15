import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ApiResponse, Item } from '#core/interfaces';

export const ItemsActions = createActionGroup({
  source: 'Items',
  events: {
    'Update item': props<{ item: Item }>(),
    'Uncheck all': emptyProps(),
    'Load items success': props<{ res: ApiResponse }>(),
  }
})
