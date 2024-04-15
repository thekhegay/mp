import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'displayDate',
})
export class DisplayDatePipe implements PipeTransform {
  transform(value: Date | string | number | null | undefined, format = 'd MMMM yyyy, HH:mm'): string {
    const date = typeof value === 'number' || typeof value === 'string' ? new Date(value) : value;

    if (!date) {
      return '';
    }

    return formatDate(date, format, 'ru');
  }
}
