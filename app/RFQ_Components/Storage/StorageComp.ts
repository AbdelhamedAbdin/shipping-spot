// Built-in Angular Apps
import { Component, Injectable } from '@angular/core';
import {getItemsOrNone, RFQBody, selectServiceType} from "../service_handlers";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RFQsService} from "../../../services/CRMModules/RFQs";
import {ActivatedRoute} from "@angular/router";
import {StorageService} from "../../interface-models/rfq_type_services/Storage";
import {AirFreightService} from "../../interface-models/rfq_type_services/AirFreight";
import {AddRemoveItems} from "../add_remove_items";


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-storage',
  templateUrl: './StorageComp.html',
  styleUrls: []
})

export class StorageComp {
  service_type_param: any;
  rfq_group_id: any;

  formGroup: any;
  default_term: string = "-None-";
  space_types: Array<string> = ["-None-", "Square Meter", "Cubic Meter"];
  storage_types: Array<string> = ["-None-", "Fixed Space", "Per Cargo Size"];

  constructor(private RFQService: RFQsService, private currentRoute: ActivatedRoute) {
    selectServiceType(this);
    // Get real name of the service
    this.currentRoute.queryParams.subscribe(res => {
      this.service_type_param = res.service_type
    })

    this.rfq_group_id = this.currentRoute.parent?.snapshot.params.id;

    this.formGroup = new FormGroup({
      Commodity: new FormControl<string>('', [ Validators.required ]),
      Note: new FormControl<string>(''),

      Space_Type: new FormControl<string>(this.default_term),
      Storage_Type: new FormControl<string>(this.default_term),
      City: new FormControl<string>(''),
      Preferred_District: new FormControl<string>(''),
      Space: new FormControl<number|null>(null),

      From: new FormControl<Date>(new Date()),
      To: new FormControl<Date>(new Date()),

      Total_Number_of_Packages: new FormControl<number|null>(null, [ Validators.pattern(/d+/g) ]),
      Total_Net_Weight: new FormControl<number|null>(null, [ Validators.pattern(/d+/g) ]),
      Total_Gross_weight: new FormControl<number|null>(null, [ Validators.pattern(/d+/g) ]),
    });

    new AddRemoveItems().windowButtons();
  }

  createRFQ(RFQForm: AirFreightService)
  {
    let item_list = getItemsOrNone(RFQForm, this);
    RFQBody(RFQForm, item_list, this);
  }
}
