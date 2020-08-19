import { Component, OnInit, Input } from '@angular/core';

// TODO Make onpush
@Component({
  selector: 'app-day-wrapper',
  templateUrl: './day-wrapper.component.html',
  styleUrls: ['./day-wrapper.component.scss']
})
export class DayWrapperComponent implements OnInit {

  @Input() public forecast: any;

  public morningTemperature: any;
  public dailyTemperature: any;
  public eveningTemperature: any;

  constructor() { 
    
  }

  ngOnInit(): void {


  }

}
