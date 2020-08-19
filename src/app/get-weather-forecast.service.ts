import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ForecastData } from 'src/app/app.interface';

// This should normally be kept in a place without public access
const appid = 'cf33963b4e0a2aa9bca1fd938ce9b1d8';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {

  constructor(
    private _http: HttpClient
  ) { }

  public getForecastObservable(cityId: number = 756135): Observable<ForecastData> {

    const url = `http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${appid}`;

    return this._http.get<any>(url)
    .pipe(
      take(1), // TODO tu czy  w subskrypcji ??
      map(data => data.list),
      map(data => {
        return data.map(el => {
          const { dt_txt, main } = el;
          return { dt_txt, main };
        });
      }),
      // tap(el => console.log(el)),
    );
  }

}
