import { Injectable } from '@angular/core';
import { RadioOptions, Poke } from '../../model'

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  public pokemons: Poke[] = []
  public valueChecked: RadioOptions = {id: 0, text: "Name", checked: true};
  public pokemonTypes = ["Grass", "Poison", "Fire", "Flying", "Water", "Bug", "Normal", "All", "Fighting", "Rock", "Steel", "Ice", "Ghost", "Dragon", "Psychic", "Ground", "Electric"];
  public pickerIndex = 7;
  public searchPhrase = "";
  public radioOptions: Array<RadioOptions> = [
    {
      id: 0,
      text: "Name",
      checked: true,
    },
    {
      id: 1,
      text: "Id",
      checked: false,
    }
  ]
  constructor() {}


}
