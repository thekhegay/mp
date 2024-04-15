import { ChangeDetectionStrategy, Component, HostBinding, signal, ViewEncapsulation } from '@angular/core';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { DisplayDatePipe } from '#core/pipes';

interface DeviceItem {
  icon: string;
  title: string;
  status?: 'primary' | 'info';
}

@Component({
  standalone: true,
  selector: 'mp-actions',
  templateUrl: 'actions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [NzPopoverModule, DisplayDatePipe],
})
export class ActionsComponent {
  @HostBinding() class = 'mp-actions';

  protected readonly now = Date.now();
  protected isMessagesVisible = false;
  protected isDevicesVisible = false;
  protected readonly devices: DeviceItem[] = [
    { icon: 'assets/icons/signal-c.svg', title: 'C219-00001' },
    { icon: 'assets/icons/signal-a.svg', title: 'A55-12345', status: 'primary' },
    { icon: 'assets/icons/sensor.svg', title: 'Датчик №83, Sentro 8', status: 'info' },
    { icon: 'assets/icons/signal-c.svg', title: 'C219-00003' },
  ]
}
