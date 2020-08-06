import { Injectable } from '@angular/core';
import { StoreService } from './store.service'
import { PokeService } from '../poke.service'

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(private storeService: StoreService, private pokeService: PokeService) {}

  public filterPokemons(inputValue) {
    if (inputValue!== "") {
      this.storeService.searchPhrase = inputValue;
      switch(this.storeService.valueChecked.id) {
        case 0:
          this.storeService.pokemons = this.storeService.pickerIndex !== 7
          ? this.pokeService.getPokemons().filter(d => d.name.toLowerCase().match(inputValue.toLowerCase()) && d.type.includes(this.storeService.pokemonTypes[this.storeService.pickerIndex]))
          : this.pokeService.getPokemons().filter(d => d.name.toLowerCase().match(inputValue.toLowerCase()))
          break;
        case 1:
          this.storeService.pokemons = this.storeService.pickerIndex !== 7
          ? this.pokeService.getPokemons().filter(d => parseInt(d.id, 10) == parseInt(inputValue, 10) && d.type.includes(this.storeService.pokemonTypes[this.storeService.pickerIndex]))
          : this.pokeService.getPokemons().filter(d => parseInt(d.id, 10) == parseInt(inputValue, 10))
          break;
      }
    } else {
      this.storeService.pokemons = this.storeService.pickerIndex !== 7
      ? this.pokeService.getPokemons().filter(d => d.type.includes(this.storeService.pokemonTypes[this.storeService.pickerIndex]))
      : this.pokeService.getPokemons();
    }
  }
}
