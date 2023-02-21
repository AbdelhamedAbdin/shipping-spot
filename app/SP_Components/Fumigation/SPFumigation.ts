// Built-in Angular Apps
import { Component, Injectable } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { userLogged } from "../../../utils";
import {SPQuoationService} from "../../../services/CRMModules/SPQuoation";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import AirFreightService from "../../interface-models/sp_type_services/AirFreight";
import FumigationService from "../../interface-models/sp_type_services/Fumigation";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-sp-fumigation',
  templateUrl: './SPFumigation.html',
  styleUrls: ['./SPFumigation.css']
})

export class SPFumigation {
  title = "Fumigation";
  getParam: any;
  account_id: any = "";
  getRFQParamID: any;
  service_forms: any = null;

  constructor(private SPQuoationService: SPQuoationService, private routerParam: ActivatedRoute) {
    this.getParam = this.routerParam.snapshot.paramMap;
    this.getRFQParamID = this.routerParam.parent?.snapshot.paramMap.get("id");
    this.account_id = new userLogged().parseStorage(localStorage).AccountID;
  }

  formGroup: any = new FormGroup({
    Fumigation_Time_days: new FormControl<Date>(new Date()),
    Price: new FormControl<number|null>(null),
    All_In_Price: new FormControl<number|null>(null),
    Price_Breakdown: new FormControl<string>(''),
    Credit_Terms: new FormControl<string>(''),
    Price_Validity: new FormControl<Date>(new Date()),
    Note: new FormControl<string>(''),
    Credit_Amount: new FormControl<number|null>(null),
    Credit_Period_days: new FormControl<number|null>(null),
    Terms_Conditions: new FormControl<string>('')
  })

  createQuotation(SPQuote: FumigationService) {
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