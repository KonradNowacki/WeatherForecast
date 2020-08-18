import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DayWrapperComponent } from './day-wrapper/day-wrapper.component';
import { WeatherForecstService } from './get-weather-forecst.service';

@NgModule({
  declarations: [
    AppComponent,
    DayWrapperComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [WeatherForecstService],
  bootstrap: [AppComponent]
})
export class AppModule { }
