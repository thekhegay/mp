import { ChangeDetectionStrategy, Component, HostBinding, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, filter, interval, map, Observable, shareReplay, timer, timestamp } from 'rxjs';
import { getTimestamp } from '#store/items';
import { AsyncPipe } from '@angular/common';
import { DisplayDatePipe } from '#core/pipes';
import { isDefined } from '#core/utils';
import { MapControlsComponent } from '#core/components';

@Component({
  standalone: true,
  selector: 'mp-server-info',
  templateUrl: 'server-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MapControlsComponent,
    AsyncPipe,
    DisplayDatePipe,
  ]
})
export class ServerInfoComponent implements OnInit {
  @HostBinding() class = 'mp-server-info';

  private readonly store = inject(Store);
  protected readonly timestamp$ = timer(0, 1000).pipe(map(() => new Date()));

  ngOnInit(): void {

  }
}
