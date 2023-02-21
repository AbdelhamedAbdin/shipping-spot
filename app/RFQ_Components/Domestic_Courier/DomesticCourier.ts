// Built-in Angular Apps
import { Component, Injectable } from '@angular/core';
import {getItemsOrNone, RFQBody, selectServiceType} from "../service_handlers";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RFQsService} from "../../../services/CRMModules/RFQs";
import {ActivatedRoute} from "@angular/router";
import {DomesticCourierService} from "../../interface-models/rfq_type_services/DomesticCourier";
import {AirFreightService} from "../../interface-models/rfq_type_services/AirFreight";
import {AddRemoveItems} from "../add_remove_items";


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-domestic-courier',
  templateUrl: './DomesticCourier.html',
  styleUrls: []
})

export class DomesticCourier {
  service_type_param: any;
  rfq_group_id: any;
  formGroup: any;

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

      Pickup_Country: new FormControl<string>(''),
      Delivery_Country: new FormControl<string>(''),
      Pickup_Address: new FormControl<string>(''),
      Delivery_Address: new FormControl<string>(''),

      Total_Number_of_Packages: new FormControl<number|null>(null, [ Validators.pattern(/d+/g) ]),
      Total_Net_Weight: new FormControl<number|null>(null, [ Validators.pattern(/d+/g) ]),
      Total_Gross_weight: new FormControl<number|null>(null, [ Validators.pattern(/d+/g) ]),

      Description: new FormControl<string>('')
    });

    new AddRemoveItems().windowButtons();
  }
  createRFQ(RFQForm: AirFreightService)
  {
    let item_list = getItemsOrNone(RFQForm, this);
    RFQBody(RFQForm, item_list, this);
  }
}
