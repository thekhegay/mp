import { isDevMode } from '@angular/core';

import { ActionReducer, MetaReducer } from '@ngrx/store';

import { SafeAny } from '#core/interfaces';

function log(reducer: ActionReducer<SafeAny>): ActionReducer<SafeAny> {
  return function (state, action) {
    const newState = reducer(state, action);

    if (isDevMode()) {
      console.log('%c prev state:', 'color: #01579b', state);
      console.log(`%c action: ${action.type}`, 'color: #f84821', action);
      console.log('%c new state:', 'color: #4caf50', newState);
    }

    return newState;
  };
}

export const metaReducers: MetaReducer<SafeAny>[] = [log];
