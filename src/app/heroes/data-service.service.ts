import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private heroesRx = new BehaviorSubject(<any>[])
  heroesList = this.heroesRx.asObservable()


  constructor() { }

  updateListOfHeroes(heroes:any){
    this.heroesRx.next(heroes)
  }
}
