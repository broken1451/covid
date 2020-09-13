import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const url = environment.urlCovid;
export interface CountryCovid {
  Country: string;
  Slug: string;
  ISO2: string;
}

@Injectable({
  providedIn: 'root',
})
export class CovidService {

  constructor(private httpClient: HttpClient) {}

  getCountries() {
    return this.httpClient.get<CountryCovid[]>(`${url}/countries` );
  }

  getCasesByCountry(country: string){
    return this.httpClient.get<[]>(`${url}/dayone/country/${country}`);
  }

  getCasesEvery10Seconds(country: string, status: string ){
    return this.httpClient.get<[]>(`${url}/live/country/${country}/status/${status}`);
  }

  getSumary(){
    return this.httpClient.get(`${url}/summary`);
  }

}
