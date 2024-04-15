import { DestroyRef, Directive, inject } from '@angular/core';

@Directive()
export abstract class AbstractBase {
  protected readonly destroyed$ = inject(DestroyRef);
}
