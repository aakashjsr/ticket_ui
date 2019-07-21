import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'key2string'
})
export class Key2stringPipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
    return value.split('_').join(' ');
  }

}
