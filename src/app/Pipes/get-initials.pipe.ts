import { Pipe, PipeTransform } from '@angular/core';
import { GetInitials } from '../Utils/text';

@Pipe({
  name: 'getInitials'
})
export class GetInitialsPipe implements PipeTransform {
  transform(text: string): string {
    return GetInitials(text);
  }
}