// Built-in Angular Apps
import {Component, Injectable, OnInit} from '@angular/core';
import {getItemsOrNone, RFQBody, selectServiceType} from "../service_handlers";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RFQsService} from "../../../services/CRMModules/RFQs";
import {ActivatedRoute} from "@angular/router";
import {DomesticTruckingService} from "../../interface-models/rfq_type_services/DomesticTrucking";
import {AirFreightService} from "../../interface-models/rfq_type_services/AirFreight";
import {AddRemoveItems} from "../add_remove_items";
import {compareWeights, DimensionalWeight, grossWeight, netWeight, numberOfPKGs} from "../../RFQ/Total_Calculations";
import {TotalQuantity} from "../../RFQ/Total_Quantity_Event";
import {TotalDimensionalWeight} from "../../RFQ/Total_Dimensional_Weight";
import {TotalNetWeight} from "../../RFQ/Total_Net_Weight";
import {TotalGrossWeight} from "../../RFQ/Total_Gross_Weight";


@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-domestic-trucking',
  templateUrl: './DomesticTrucking.html',
  styleUrls: ["./DomesticTrucking.css"]
})

export class DomesticTrucking implements OnInit {
  service_type_param: any;
  rfq_group_id: any;
  formGroup: any;
  default_term: string = "-None-";
  choose_trucks = ["-None-", "Choose your truck", "Enter Shipment Details"];
  truck_types = ["-None-", 'Small open', 'Large open', 'Small closed', 'Large closed', 'Small refer', 'Large refer'];
  setStatus: string = "";

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
      Choose_Truck: new FormControl<string>(this.default_term),
      Number_of_Trucks: new FormControl<number|null>(null),
      Status: new FormControl<string>(''),

      Pickup_Country: new FormControl<string>(''),
      Delivery_Country: new FormControl<string>(''),
      Pickup_Address: new FormControl<string>(''),
      Delivery_Address: new FormControl<string>(''),

      child: new FormGroup({
        Quantity: new FormControl<number|null>(null, [ Validators.pattern(/d+/) ]),
        Length: new FormControl<number|null>(null, [ Validators.pattern(/d+/) ]),
        Width: new FormControl<number|null>(null, [ Validators.pattern(/d+/) ]),
        Height: new FormControl<number|null>(null, [ Validators.pattern(/d+/) ]),
        Net_Weight: new FormControl<number|null>(null, [ Validators.pattern(/d+/) ]),
        Gross_Weight: new FormControl<number|null>(null, [ Validators.pattern(/d+/) ]),
      })
    });

    new AddRemoveItems().windowButtons();
  }

  ngOnInit() {
    new TotalQuantity().listenToChangeEvent();
    new TotalDimensionalWeight(1000000).listenToChangeEvent();
    new TotalNetWeight().listenToChangeEvent();
    new TotalGrossWeight().listenToChangeEvent();
  }

  createRFQ(RFQForm: DomesticTruckingService)
  {
    let item_list = getItemsOrNone(RFQForm, this);
    RFQForm.Total_Number_of_Packages = numberOfPKGs(item_list);
    RFQForm.Total_CBM = DimensionalWeight(item_list, 1000000);
    RFQForm.Total_Gross_weight = grossWeight(item_list);
    RFQForm.Total_Net_Weight = netWeight(item_list);
    RFQForm.Total_Chargeable_CBM = compareWeights(RFQForm.Total_Gross_weight, RFQForm.Total_CBM);
    RFQBody(RFQForm, item_list, this);
  }

  submitStatus($event: any) {
    this.setStatus = $event.target.id;
  }
}
