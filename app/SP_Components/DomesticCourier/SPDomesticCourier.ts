// Built-in Angular Apps
import { Component, Injectable } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { userLogged } from "../../../utils";
import {SPQuoationService} from "../../../services/CRMModules/SPQuoation";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import AirFreightService from "../../interface-models/sp_type_services/AirFreight";
import DomesticCourierService from "../../interface-models/sp_type_services/DomesticCourier";
import {createQuote} from "../service_handlers";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-sp-domestic-courier',
  templateUrl: './SPDomesticCourier.html',
  styleUrls: ['./SPDomesticCourier.css']
})

export class SPDomesticCourier {
  title = "Domestic Courier";
  getParam: any;
  account_id: any = "";
  getRFQParamID: any;
  service_forms: any = null;

  constructor(private SPQuoationService: SPQuoationService, private routerParam: ActivatedRoute, private router: Router) {
    this.getParam = this.routerParam.snapshot.paramMap;
    this.getRFQParamID = this.routerParam.parent?.snapshot.paramMap.get("id");
    this.account_id = new userLogged().parseStorage(localStorage).AccountID;
  }

  formGroup: any = new FormGroup({
    Delivery_date: new FormControl<Date>(new Date()),
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

  createQuotation(SPQuote: DomesticCourierService) {
    createQuote(this, SPQuote, this.title);
  }
}
