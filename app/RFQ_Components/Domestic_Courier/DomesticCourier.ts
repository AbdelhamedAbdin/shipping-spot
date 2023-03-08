// Built-in Angular Apps
import { Component, Injectable } from '@angular/core';
import {getItemsOrNone, RFQBody, selectServiceType} from "../service_handlers";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RFQsService} from "../../../services/CRMModules/RFQs";
import {ActivatedRoute} from "@angular/router";
import {DomesticCourierService} from "../../interface-models/rfq_type_services/DomesticCourier";
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
  selector: 'app-domestic-courier',
  templateUrl: './DomesticCourier.html',
  styleUrls: ["./DomesticCourier.css"]
})

export class DomesticCourier {
  service_type_param: any;
  rfq_group_id: any;
  formGroup: any;
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
      Status: new FormControl<string>(''),

      Pickup_Country: new FormControl<string>(''),
      Delivery_Country: new FormControl<string>(''),
      Pickup_Address: new FormControl<string>(''),
      Delivery_Address: new FormControl<string>('')
    });

    new AddRemoveItems().windowButtons();
  }

  ngOnInit() {
    new TotalQuantity().listenToChangeEvent();
    new TotalDimensionalWeight(5000).listenToChangeEvent();
    new TotalNetWeight().listenToChangeEvent();
    new TotalGrossWeight().listenToChangeEvent();
  }

  createRFQ(RFQForm: DomesticCourierService)
  {
    let item_list = getItemsOrNone(RFQForm, this);
    RFQForm.Total_Number_of_Packages = numberOfPKGs(item_list);
    RFQForm.Total_Dimensional_Weight = DimensionalWeight(item_list, 5000);
    RFQForm.Total_Net_Weight = netWeight(item_list);
    RFQForm.Total_Gross_weight = grossWeight(item_list);
    RFQForm.Total_Chargeable_Weight = compareWeights(RFQForm.Total_Gross_weight, RFQForm.Total_Dimensional_Weight);
    RFQBody(RFQForm, item_list, this);
  }

  submitStatus($event: any) {
    this.setStatus = $event.target.id;
  }
}
