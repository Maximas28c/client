import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HeroesService } from '../services/heroes.service';
import { DataServiceService } from './data-service.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
})
export class HeroesComponent implements OnInit {
  public searchFormGroup: FormGroup
  public heroes = [];
  public heroesFromAPI = []
  public heroesCount: Number;
  public heroesGenInfo: any;

  constructor(
    public heroesService: HeroesService,
    public fb: FormBuilder,
    public heroesDataService: DataServiceService
  ) {}

  ngOnInit(): void {

    this.searchFormGroup = this.fb.group({
      searchInput: ''
    })

    this.heroesService.getHeroesGenInfo().subscribe((data) => {
      this.heroesCount = data.count+2;
      for (let currentIdx = 1; currentIdx < this.heroesCount; currentIdx++) {
        if (currentIdx !== 17){
          this.heroesService.getOneHero(currentIdx).subscribe(dt => {
                this.heroesFromAPI.push(dt);
              }
          );
        }
      }
    });

    this.heroes = this.heroesFromAPI
    this.heroesDataService.updateListOfHeroes(this.heroesFromAPI)

    this.searchFormGroup.valueChanges.subscribe(
      input=>{
        if (input.searchInput !== ''){
          this.heroes = this.heroes.filter((heroes)=>
            heroes.name.toLowerCase().includes(input.searchInput.toLowerCase()) ||
            heroes.height.toLowerCase().includes(input.searchInput.toLowerCase()) ||
            heroes.mass.toLowerCase().includes(input.searchInput.toLowerCase()) ||
            heroes.skin_color.toLowerCase().includes(input.searchInput.toLowerCase()) ||
            heroes.eye_color.toLowerCase().includes(input.searchInput.toLowerCase()) ||
            heroes.birth_year.toLowerCase().includes(input.searchInput.toLowerCase()) ||
            heroes.gender.toLowerCase().includes(input.searchInput.toLowerCase())
          )
        } else {
          this.heroes = this.heroesFromAPI
        }
      }
    )
  }
}
