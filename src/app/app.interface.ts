export const kelvinCelsiusDiff = 273.15;

export enum PartOfDay {
    morning = '06:00:00',
    day = '12:00:00',
    night = '21:00:00'
}
export interface City {
    id: number;
    name: string;
}

export interface ForecastData {
    dt_txt: string;
    main: any;
}

export interface StatisticsData {
    maxTemp: number;
    minTemp: number;
    meanTemp: number;
    modeTemp: number[];
}
