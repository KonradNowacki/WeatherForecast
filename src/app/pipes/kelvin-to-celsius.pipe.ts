import { Pipe, PipeTransform } from '@angular/core';

import { kelvinCelsiusDiff } from 'src/app/app.interface';

@Pipe({
  name: 'kelvinToCelsius'
})
export class KelvinToCelsiusPipe implements PipeTransform {

  transform(value: number): string {
    return value ? `${Math.round(value - kelvinCelsiusDiff)}°C` : 'N/A';
  }

}
