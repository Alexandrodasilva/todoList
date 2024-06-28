import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customUpperCase',
  standalone: true
})
export class CustomUpperCasePipe implements PipeTransform {

  transform(value: string | undefined): string {
    if(value && value.length > 0){
      return value.trim().toUpperCase();
    }else return '';
  }

}
