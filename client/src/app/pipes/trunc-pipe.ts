import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trunc',
})
export class TruncPipe implements PipeTransform {
  transform(value: string, num: number, end:string="..."): unknown {
    return value.slice(0,num) + end;
  }
}
