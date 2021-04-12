import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(
    private http: HttpClient
  ) { }

  getHeroesGenInfo(){
    return this.http.get<any>(`https://swapi.dev/api/people/`)
  }
  getOneHero(idx){
    return this.http.get<any>(`https://swapi.dev/api/people/${idx}/`)
  }
}
