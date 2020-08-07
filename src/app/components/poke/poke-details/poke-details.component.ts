import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from "@nativescript/angular/router";
import { Poke, CustomPokeStats } from 'src/app/model';
import { StoreService } from '../../../services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ns-poke-details',
  templateUrl: './poke-details.component.html',
  styleUrls: ['./poke-details.component.css']
})
export class PokeDetailsComponent implements OnInit, OnDestroy {
  public pokemon: Poke;
  public dataLoaded = false;
  public subscription: Subscription
  public customPokeStats: CustomPokeStats[] = [];

  constructor(private route: ActivatedRoute, private storeService: StoreService, private nativeRoute: RouterExtensions) { }

  ngOnInit(): void {
    this.initData();
    this.setCustomPokeStats();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initData() {
    this.subscription = this.route.params.subscribe(param => {
      this.pokemon = this.storeService.pokemons.find(d => d.id == param['id']);
      if(this.pokemon) this.dataLoaded = true;
    }, (err) => console.error(err))
  }

  public setCustomPokeStats() {
    const newArray = Object.entries(this.pokemon.stats);
    newArray.forEach(d => {
      this.customPokeStats.push({name: d[0], value: d[1]})
    });
  }

  public goBack() {
    this.nativeRoute.backToPreviousPage();
  }

}
