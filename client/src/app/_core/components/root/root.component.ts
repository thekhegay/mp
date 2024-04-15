import { ChangeDetectionStrategy, Component, HostBinding, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from '#core/services';
import { ItemsActions } from '#store/items';
import { Store } from '@ngrx/store';
import { ActionsComponent, MapComponent, ServerInfoComponent, SidebarComponent } from '#core/components';

@Component({
  standalone: true,
  selector: 'mp-root',
  templateUrl: 'root.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [SidebarComponent, MapComponent, ServerInfoComponent, ActionsComponent]
})
export class RootComponent implements OnInit {
  @HostBinding() class = 'app-root';

  private readonly apiService = inject(ApiService);
  private readonly store = inject(Store);

  ngOnInit() {
    this.apiService.ws.subscribe(res => {
      this.store.dispatch(ItemsActions.loadItemsSuccess({ res }));
    });
  }
}
