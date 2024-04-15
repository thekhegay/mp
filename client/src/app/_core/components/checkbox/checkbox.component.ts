import { ChangeDetectionStrategy, Component, forwardRef, HostBinding, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

import { noop } from 'rxjs';
import { AbstractBase } from '#core/components';
import { generateRandomId } from '#core/utils';
import { SafeAny } from '#core/interfaces';

@Component({
  standalone: true,
  selector: 'mp-checkbox',
  templateUrl: 'checkbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent extends AbstractBase implements ControlValueAccessor {
  protected readonly id = generateRandomId();
  get checked(): boolean {
    return this._checked;
  }
  set checked(value: boolean) {
    if (value != this.checked) {
      this._checked = value;
      this.onChange(value);
      this.onTouched();
    }
  }
  private _checked: boolean = false;

  onChange: (value: boolean) => void = noop;
  onTouched: () => void = noop;

  @HostBinding('class')
  get elClasses(): SafeAny {
    return {
      'mp-checkbox': true,
      'mp-checkbox--checked': this.checked,
    };
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(checked: boolean): void {
    this.checked = checked;
  }
}
