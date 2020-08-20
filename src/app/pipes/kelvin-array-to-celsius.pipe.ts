import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'kelvinArrayToCelsius'
})
export class KelvinArrayToCelsiusPipe implements PipeTransform {

  transform(values: number[], ...args: unknown[]): string {

    const strings = values.map(num => `${Math.round(num - 273.15)}°C`);

    return strings.join(', ')
  }

}
