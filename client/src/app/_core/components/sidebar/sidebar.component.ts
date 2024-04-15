import { ChangeDetectionStrategy, Component, effect, HostBinding, inject, signal } from '@angular/core';
import { DrawerComponent } from '#core/components';
import { NzDrawerModule, NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { ItemType } from '#core/interfaces';
import { JsonPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'mp-sidebar',
  templateUrl: 'sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzDrawerModule, JsonPipe],
})
export class SidebarComponent {
  @HostBinding() class = 'mp-sidebar';

  private readonly drawerService = inject(NzDrawerService);
  protected readonly activeLink = signal<number>(null);
  protected readonly activeDrawers = signal<NzDrawerRef[]>([]);
  protected readonly itemType = ItemType;

  constructor() {
    effect(() => {
      if (this.activeDrawers().length === 0) {
        this.activeLink.set(null);
      }
    }, { allowSignalWrites: true });
  }


  openDrawer(type: ItemType, linkIndex: number): void {
    this.activeDrawers().forEach(i => i.close());

    const drawerRef = this.drawerService.create<DrawerComponent, { value: ItemType }, string>({
      nzContent: DrawerComponent,
      nzPlacement: 'left',
      nzOffsetX: 40,
      nzClosable: false,
      nzWidth: 'auto',
      nzData: {
        value: type
      }
    });
    this.activeLink.set(linkIndex);
    this.activeDrawers.set([...this.activeDrawers(), drawerRef]);

    drawerRef.afterClose.subscribe(() => {
      this.activeDrawers.set(this.activeDrawers().filter(i => i !== drawerRef))
    });
  }
}
