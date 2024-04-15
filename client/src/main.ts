import { bootstrapApplication } from '@angular/platform-browser';
import { ApplicationConfig } from '@angular/core';
import { RootComponent } from './app/_core/components/root/root.component';
import { provideStore } from '@ngrx/store';
import { itemsFeatureKey, itemsReducer } from '#store/items';
import { metaReducers } from '#store/meta.reducer';
import { registerLocaleData } from '@angular/common';
import ru from '@angular/common/locales/ru';
import { provideAnimations } from '@angular/platform-browser/animations';

registerLocaleData(ru, 'ru');

bootstrapApplication(RootComponent, config()).catch(e => console.error(e));

function config(): ApplicationConfig {
  return {
    providers: [
      provideAnimations(),
      provideStore({
        [itemsFeatureKey]: itemsReducer
      }, { metaReducers }),
    ]
  }
}
