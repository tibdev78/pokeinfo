import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { StoreService, ActionService } from '../../services';
import { SearchBar } from "tns-core-modules/ui/search-bar";
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { ModalDialogOptions, ModalDialogService } from '@nativescript/angular/modal-dialog'
import { DialogFilterComponent } from '../dialog/dialog-filter/dialog-filter.component';
import { ExtendedShowModalOptions } from "nativescript-windowed-modal"
import { Poke } from 'src/app/model';
import { RouterExtensions } from "@nativescript/angular/router";

@Component({
  selector: 'ns-poke',
  templateUrl: './poke.component.html',
  styleUrls: ['./poke.component.css']
})
export class PokeComponent implements OnInit, OnDestroy {
  public searchControl = new FormControl();
  public subscription: Subscription;

  constructor(
    private vcRef: ViewContainerRef,
    private modalDialogService: ModalDialogService,
    public storeService: StoreService,
    public actionService: ActionService,
    public router: RouterExtensions) { }

  ngOnInit(): void {
    this.setEvent();
    this.initPokemons();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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

  public navigateToPokeDetails(poke: Poke) {
    this.router.navigateByUrl(`poke/${poke.id}`, {
      animated: true,
      transition: {
        name: 'slideTop',
        duration: 400,
        curve: 'linear'
      }
    })
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