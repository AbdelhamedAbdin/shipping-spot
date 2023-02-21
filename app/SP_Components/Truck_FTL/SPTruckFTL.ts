// Built-in Angular Apps
import { Component, Injectable } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { userLogged } from "../../../utils";
import {SPQuoationService} from "../../../services/CRMModules/SPQuoation";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import AirFreightService from "../../interface-models/sp_type_services/AirFreight";
import TruckingFTLService from "../../interface-models/sp_type_services/TruckingFTL";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-sp-truck-ftl',
  templateUrl: './SPTruckFTL.html',
  styleUrls: ['./SPTruckFTL.css']
})

export class SPTruckFTL {
  title = "International Trucking - FTL";
  getParam: any;
  account_id: any = "";
  getRFQParamID: any;

  constructor(private SPQuoationService: SPQuoationService, private routerParam: ActivatedRoute) {
    this.getParam = this.routerParam.snapshot.paramMap;
    this.getRFQParamID = this.routerParam.parent?.snapshot.paramMap.get("id");
    this.account_id = new userLogged().parseStorage(localStorage).AccountID;
  }

  formGroup: any = new FormGroup({
    Price: new FormControl<number|null>(null),
    All_In_Price: new FormControl<number|null>(null),
    Price_Breakdown: new FormControl<string>(''),
    Transit_Time_days: new FormControl<number|null>(null),
    Free_Time_days: new FormControl<number|null>(null),
    Credit_Terms: new FormControl<string>(''),
    Departure_Schedule: new FormControl<string>(''),
    POL: new FormControl<string>(''),
    POD: new FormControl<string>(''),
    Price_Validity: new FormControl<Date>(new Date()),
    Note: new FormControl<string>(''),
    Credit_Amount: new FormControl<number|null>(null),
    Credit_Period_days: new FormControl<number|null>(null),
    Terms_Conditions: new FormControl<string>('')
  })

  createQuotation(SPQuote: TruckingFTLService) {
    let payload = {
      url: "https://sandbox.zohoapis.com/crm/v3/SP_Quotations",
      method: "POST",
      body: {
        data: [
          {
            RFQ: {
              id: this.getRFQParamID
            },
            Service_Provider: {
              id: this.account_id
            },
            ...SPQuote
          }
        ]
      }
    }

    // this.SPQuoationService.NewRecord(payload).subscribe(res => {
    //   console.log("data has been saved");
    //   console.log(res);
    // });
  }
}
