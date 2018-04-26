import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class FlightService {

  constructor(private http: Http) { }

  private CITY_DETAILS = "http://demo0884811.mockable.io/airports"; //mockable link for Airports data
  private AIRLINES_URL="http://demo0884811.mockable.io/airlines"; //mockable link for Airlines Data
  
//Gets JSON data for all the Cities/Airports
  getCities() {

    return this.http.get(this.CITY_DETAILS);
  }
  
 //Gets JSON data for All the Airlines 
  getAirlines(){
    return this.http.get(this.AIRLINES_URL);
  }

}
