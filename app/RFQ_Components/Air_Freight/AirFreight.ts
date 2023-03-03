// Built-in Angular Apps
import {Component, Injectable, OnInit} from '@angular/core';
import {RFQBody, selectServiceType} from "../service_handlers";
import {FormControl, FormGroup, Validators} from "@angular/forms";
// ShippingSpot Components
import {AirFreightService} from "../../interface-models/rfq_type_services/AirFreight";
import {ActivatedRoute} from "@angular/router";
import {RFQsService} from "../../../services/CRMModules/RFQs";
import {AddRemoveItems} from '../add_remove_items';
import {getItemsOrNone} from '../service_handlers';
import {compareWeights, DimensionalWeight, grossWeight, netWeight, numberOfPKGs} from "../../RFQ/Total_Calculations";
import {TotalQuantity} from '../../RFQ/Total_Quantity_Event';
import {TotalDimensionalWeight} from '../../RFQ/Total_Dimensional_Weight';
import {TotalNetWeight} from "../../RFQ/Total_Net_Weight";
import {TotalGrossWeight} from "../../RFQ/Total_Gross_Weight";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-air-freight',
  templateUrl: './AirFreight.html',
  styleUrls: ["./AirFreight.css"]
})

export class AirFreight implements OnInit {
  service_type_param: any;
  rfq_group_id: any;

  formGroup: any;
  default_term: string = "-None-";
  terms: Array<string> = ["-None-", "Door to Door", "Port to Port", "Incoterm"];
  incoterms: Array<string> = ["-None-", "Option 1", "Option 2"];

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

      Shipping_Term: new FormControl<string>(this.default_term),
      Incoterm: new FormControl<string>(this.default_term),
      Need_Insurance: new FormControl<boolean>(false),
      Value_of_Goods: new FormControl<number|null>(null),
      Dangerous_Commodity: new FormControl<boolean>(false),
      Need_Temperature_Control: new FormControl<boolean>(false),
      Temperature: new FormControl<number|null>(null),

      Pickup_Country: new FormControl<string>(''),
      Delivery_Country: new FormControl<string>(''),
      Pickup_Address: new FormControl<string>(''),
      Delivery_Address: new FormControl<string>(''),
      POL_Port_of_Loading: new FormControl<string>(''),
      POD_Port_of_Discharge: new FormControl<string>(''),
      Safety_Data_Sheet: new FormControl<string>(''),
      Total_Packages: new FormControl<number|null>(null),

      child: new FormGroup({
        Quantity: new FormControl<number|null>(null, [ Validators.pattern(/d+/) ]),
        Length: new FormControl<number|null>(null, [ Validators.pattern(/d+/) ]),
        Width: new FormControl<number|null>(null, [ Validators.pattern(/d+/) ]),
        Height: new FormControl<number|null>(null, [ Validators.pattern(/d+/) ]),
        Net_Weight: new FormControl<number|null>(null, [ Validators.pattern(/d+/) ]),
        Gross_Weight: new FormControl<number|null>(null, [ Validators.pattern(/d+/) ]),
      })
    });

    // Add/Remove multi-line items
    new AddRemoveItems().windowButtons();
  }

  ngOnInit() {
    new TotalQuantity().listenToChangeEvent();
    new TotalDimensionalWeight().listenToChangeEvent();
    new TotalNetWeight().listenToChangeEvent();
    new TotalGrossWeight().listenToChangeEvent();
  }

  createRFQ(RFQForm: AirFreightService)
  {
    let item_list = getItemsOrNone(RFQForm, this);
    RFQForm.Total_Number_of_Packages = numberOfPKGs(item_list);
    RFQForm.Total_Dimensional_Weight = DimensionalWeight(item_list, 6000);
    RFQForm.Total_Net_Weight = netWeight(item_list);
    RFQForm.Total_Gross_weight = grossWeight(item_list);
    RFQForm.Total_Chargeable_Weight = compareWeights(RFQForm.Total_Gross_weight, RFQForm.Total_Dimensional_Weight);
    RFQBody(RFQForm, item_list, this);
  }

  changeStateEvent = (checked: any) => checked;
}
