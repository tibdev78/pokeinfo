import { Injectable } from '@angular/core';
import { Poke } from '../model';

const pokeJson = require('../assets/pokemon.json');

@Injectable({
  providedIn: 'root'
})
export class PokeService {

  constructor() {}

  public getPokemons(): Poke[] {
    return pokeJson as Poke[]
  }
}
