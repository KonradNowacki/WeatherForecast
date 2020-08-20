import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

import { AppComponent } from 'src/app/app.component';
import { DayWrapperComponent } from 'src/app/components/day-wrapper/day-wrapper.component';
import { WeatherForecastService } from 'src/app/get-weather-forecast.service';
import { StatisticsDataComponent } from 'src/app/components/statistics-data/statistics-data.component';
import { CityPickerComponent } from 'src/app/components/city-picker/city-picker.component';
import { KelvinToCelsiusPipe } from 'src/app/pipes/kelvin-to-celsius.pipe';
import { KelvinArrayToCelsiusPipe } from 'src/app/pipes/kelvin-array-to-celsius.pipe';
import { HumidityToPercentPipe } from 'src/app/pipes/humidity-to-percent.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DayWrapperComponent,
    StatisticsDataComponent,
    CityPickerComponent,
    KelvinToCelsiusPipe,
    KelvinArrayToCelsiusPipe,
    HumidityToPercentPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatSelectModule,
    MatCardModule,
    MatGridListModule
  ],
  providers: [
    WeatherForecastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
