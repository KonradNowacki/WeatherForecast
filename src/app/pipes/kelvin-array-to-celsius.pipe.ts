import { Pipe, PipeTransform } from '@angular/core';

import { kelvinCelsiusDiff } from 'src/app/app.interface';

@Pipe({
  name: 'kelvinArrayToCelsius'
})
export class KelvinArrayToCelsiusPipe implements PipeTransform {

  transform(values: number[]): string {

    const strings = values.map(num => `${Math.round(num - kelvinCelsiusDiff)}°C`);

    return strings.join(', ')
  }

}
