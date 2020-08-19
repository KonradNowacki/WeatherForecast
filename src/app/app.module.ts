import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';

import { AppComponent } from './app.component';
import { DayWrapperComponent } from './day-wrapper/day-wrapper.component';
import { WeatherForecastService } from './get-weather-forecast.service';
import { HttpClientModule } from '@angular/common/http';
import { StatisticsDataComponent } from './statistics-data/statistics-data.component';
import { CityPickerComponent } from './city-picker/city-picker.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { KelvinToCelsiusPipe } from './pipes/kelvin-to-celsius.pipe';
import { KelvinArrayToCelsiusPipe } from './pipes/kelvin-array-to-celsius.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DayWrapperComponent,
    StatisticsDataComponent,
    CityPickerComponent,
    KelvinToCelsiusPipe,
    KelvinArrayToCelsiusPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatSelectModule
  ],
  providers: [
    WeatherForecastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
