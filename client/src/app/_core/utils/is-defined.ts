import { Maybe } from '#core/interfaces';

export function isDefined<T>(value: Maybe<T>): value is T {
  return value != null;
}
