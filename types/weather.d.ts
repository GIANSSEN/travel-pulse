export interface WeatherCurrent {
  temp_c: number;
  temp_f: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
  wind_kph: number;
  humidity: number;
  feelslike_c: number;
  uv: number;
}

export interface WeatherDay {
  maxtemp_c: number;
  mintemp_c: number;
  avgtemp_c: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
  daily_chance_of_rain: number;
}

export interface WeatherForecastDay {
  date: string;
  date_epoch: number;
  day: WeatherDay;
}

export interface WeatherForecast {
  forecastday: WeatherForecastDay[];
}

export interface WeatherLocation {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  localtime: string;
}

export interface WeatherResponse {
  location: WeatherLocation;
  current: WeatherCurrent;
  forecast: WeatherForecast;
}
