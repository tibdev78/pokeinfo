import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalDialogParams } from "@nativescript/angular/modal-dialog";
import { RadioOptions } from 'src/app/model';
import { ListPicker } from "tns-core-modules/ui/list-picker";
import { EventData } from "tns-core-modules/data/observable";
import { StoreService } from '../../../services';

@Component({
  selector: 'ns-dialog-filter',
  templateUrl: './dialog-filter.component.html',
  styleUrls: ['./dialog-filter.component.css']
})
export class DialogFilterComponent implements OnInit {
  @ViewChild('elem') FirstCheckBox: ElementRef;
  constructor(private modalParams: ModalDialogParams, public storeService: StoreService) { }

  ngOnInit(): void {}

  public onClose() {
    this.modalParams.closeCallback(this.storeService.pickerIndex);
  }

  changeCheckedRadio(radioOption: RadioOptions) {
    this.storeService.radioOptions.forEach(d => {
      if (d.id  == radioOption.id) {
        d.checked = true;
        this.storeService.valueChecked = radioOption;
      } else {
        d.checked = false;
      }
    })
  }

  public onSelectedIndexChanged(args: EventData) {
    let picker = <ListPicker>args.object;
    if(picker) this.storeService.pickerIndex = picker.selectedIndex;
  }
}
