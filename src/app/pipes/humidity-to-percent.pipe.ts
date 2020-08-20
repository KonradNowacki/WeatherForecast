import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'humidityToPercent'
})
export class HumidityToPercentPipe implements PipeTransform {

  transform(value: number): string {
    return `${Math.round(value)}%`;
  }

}
