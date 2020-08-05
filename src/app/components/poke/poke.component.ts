import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { PokeService, StoreService } from '../../services'
import { Poke } from 'src/app/model';
import { SearchBar } from "tns-core-modules/ui/search-bar";
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { ModalDialogOptions, ModalDialogService } from '@nativescript/angular/modal-dialog'
import { DialogFilterComponent } from '../dialog/dialog-filter/dialog-filter.component';
import { ExtendedShowModalOptions } from "nativescript-windowed-modal"

@Component({
  selector: 'ns-poke',
  templateUrl: './poke.component.html',
  styleUrls: ['./poke.component.css']
})
export class PokeComponent implements OnInit {
  public pokemons: Poke[] = [];
  public searchPhrase = "";
  public searchControl = new FormControl();
  public subscription: Subscription;

  constructor(
    private pokeService: PokeService, 
    private vcRef: ViewContainerRef,
    private modalDialogService: ModalDialogService,
    public storeService: StoreService) { }

  ngOnInit(): void {
    this.setEvent();
    this.initPokemons();
  }

  public onClear(event) {
    let searchBar: SearchBar = event.object;
    searchBar.text = "";
    searchBar.dismissSoftInput();
  }
  
  private setEvent() {
    this.subscription = this.searchControl.valueChanges
    .pipe(debounceTime(500))
    .subscribe((value) => {
      this.filterPokemons(value)
    })
  }
  
  public initPokemons() {
    this.filterPokemons(this.searchPhrase)
  }

  public searchBarLoaded(event) {
    var searchbar:SearchBar = <SearchBar>event.object;
    if(searchbar.android) searchbar.android.clearFocus();
  }

  private filterPokemons(inputValue) {
    if (inputValue!== "") {
      this.searchPhrase = inputValue;
      switch(this.storeService.valueChecked.id) {
        case 0:
          this.pokemons = this.storeService.pickerIndex !== 7
          ? this.pokeService.getPokemons().filter(d => d.name.toLowerCase().match(inputValue.toLowerCase()) && d.type.includes(this.storeService.pokemonTypes[this.storeService.pickerIndex]))
          : this.pokeService.getPokemons().filter(d => d.name.toLowerCase().match(inputValue.toLowerCase()))
          break;
        case 1:
          this.pokemons = this.storeService.pickerIndex !== 7
          ? this.pokeService.getPokemons().filter(d => parseInt(d.id, 10) == parseInt(inputValue, 10) && d.type.includes(this.storeService.pokemonTypes[this.storeService.pickerIndex]))
          : this.pokeService.getPokemons().filter(d => parseInt(d.id, 10) == parseInt(inputValue, 10))
          break;
      }
    } else {
      this.pokemons = this.storeService.pickerIndex !== 7
      ? this.pokeService.getPokemons().filter(d => d.type.includes(this.storeService.pokemonTypes[this.storeService.pickerIndex]))
      : this.pokeService.getPokemons();
    }
  }

  public showDialog() {
    const options: ModalDialogOptions = {
      viewContainerRef: this.vcRef,
      context: {},
      animated: true,
      stretched: false,
      fullscreen: false,
      closeCallback: (_) => {}
    } as ExtendedShowModalOptions
    this.modalDialogService.showModal(DialogFilterComponent, options).then((_) => {
      this.filterPokemons(this.searchControl.value ? this.searchControl.value : '');
    })
  }

}
