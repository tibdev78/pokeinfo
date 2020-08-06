import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { StoreService, ActionService } from '../../services';
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
  public searchControl = new FormControl();
  public subscription: Subscription;

  constructor(
    private vcRef: ViewContainerRef,
    private modalDialogService: ModalDialogService,
    public storeService: StoreService,
    public actionService: ActionService) { }

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
      this.actionService.filterPokemons(value)
    })
  }
  
  public initPokemons() {
    this.actionService.filterPokemons(this.storeService.searchPhrase)
  }

  public searchBarLoaded(event) {
    let searchbar:SearchBar = <SearchBar>event.object;
    if(searchbar.android) searchbar.android.clearFocus();
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
      this.actionService.filterPokemons(this.searchControl.value ? this.searchControl.value : '');
    })
  }
}