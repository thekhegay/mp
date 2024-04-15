import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild
} from '@angular/core';
import { NZ_DRAWER_DATA, NzDrawerRef } from 'ng-zorro-antd/drawer';
import { Item, ItemType } from '#core/interfaces';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Store } from '@ngrx/store';
import { getItems, ItemsActions } from '#store/items';
import { AsyncPipe, DOCUMENT } from '@angular/common';
import { DisplayDatePipe } from '#core/pipes';
import { isDefined } from '#core/utils';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from '#core/components';

@Component({
  standalone: true,
  selector: 'mp-drawer',
  templateUrl: 'drawer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzTableModule, AsyncPipe, DisplayDatePipe, FormsModule, CheckboxComponent]
})
export class DrawerComponent implements OnInit {
  @ViewChild('table') tableEl: ElementRef<HTMLTableElement>;

  private readonly doc = inject(DOCUMENT);
  private readonly store = inject(Store);
  private readonly items$ = this.store.select(getItems);
  private drawerRef = inject(NzDrawerRef);
  protected readonly data: { value: ItemType } = inject(NZ_DRAWER_DATA);
  protected readonly tableData = signal<Item[]>([]);
  protected readonly itemType = ItemType;
  protected readonly isAllChecked = signal<boolean>(false);

  ngOnInit(): void {
    this.items$.subscribe(items => {
      const filteredItems = items.filter(i => i.type === this.data.value);
      this.isAllChecked.set(filteredItems.every(i => i.isChecked));
      this.tableData.set(filteredItems);
    });
  }

  close(): void {
    this.drawerRef.close();
  }

  exportTableToExcel(): void {
    const tableNavEl = this.tableEl.nativeElement;

    if (isDefined(tableNavEl)) {
      const downloadLink = this.doc.createElement('a');
      const dataType = 'application/vnd.ms-excel';
      const tableContent = tableNavEl.outerHTML.replace(/ /g, '%20');
      this.doc.body.appendChild(downloadLink);
      downloadLink.href = `data:${dataType}, ${tableContent}`;
      downloadLink.download = `${Date.now()}.xls`;
      downloadLink.click();
    }
  }

  checkAll(e: Event): void {
    const isChecked = (<HTMLInputElement>e.target).checked;
    this.tableData().map(i => {
      this.store.dispatch(ItemsActions.updateItem({ item: { ...i, isChecked } }))
    });
  }

  changeItemChecked(id: string, e: Event): void {
    const isChecked = (<HTMLInputElement>e.target).checked;
    const item = this.tableData().find(i => i.id === id);
    this.store.dispatch(ItemsActions.updateItem({ item: { ...item, isChecked } }));
  }
}
