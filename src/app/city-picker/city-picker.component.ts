import { Component, Output, EventEmitter } from '@angular/core';

import { City } from 'src/app/app.interface';

@Component({
  selector: 'app-city-picker',
  templateUrl: './city-picker.component.html',
  styleUrls: ['./city-picker.component.scss']
})
export class CityPickerComponent {

  public readonly cities: City[] = [
    {
      id: 756135,
      name: 'Warsaw',
    },
    {
      id: 1006984,
      name: 'London',
    },
    {
      id: 2950158,
      name: 'Berlin',
    },
    {
      id: 524894,
      name: 'Moscow',
    },
    {
      id: 1726701,
      name: 'Barcelona',
    },
  ];

  @Output() public citySelected = new EventEmitter<number>();

  public onCitySelected(response: any): void {
    const { value } = response.source;
    this.citySelected.emit(value);
  }

}
