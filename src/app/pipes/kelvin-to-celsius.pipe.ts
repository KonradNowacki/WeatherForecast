import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kelvinToCelsius'
})
export class KelvinToCelsiusPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    return `${Math.round(value - 273.15)}°C`;
  }

}
