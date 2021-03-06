import { Pipe, PipeTransform } from '@angular/core';
import numeral from 'numeral';

@Pipe({
  name: 'format'
})
export class Format implements PipeTransform {
  transform(text: string, type: string) {
    switch (type) {
      case 'number':
        return numeral(text).format('0,0');
      case 'amount':
        return numeral(text).format('($0.00a)').toUpperCase();
      default:
        return text;
    }
  }
}
