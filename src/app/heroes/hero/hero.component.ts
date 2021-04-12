import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  @Input() heroData: any

  public hero: any
  public hero_idx$: any
  public hero_idx: number

  constructor(
    private route: ActivatedRoute,
    private heroesDataService: DataServiceService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(idx=>(this.hero_idx$ = idx))
    this.hero_idx = this.hero_idx$.getValue().hero_idx
    this.heroesDataService.heroesList.subscribe(data=>{
      this.hero = data[this.hero_idx]
    })
  }

}
