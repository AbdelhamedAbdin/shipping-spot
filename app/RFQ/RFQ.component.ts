// Built-in Angular Apps
import { Component, Injectable } from '@angular/core';
import { GetRFQGroupServices } from "../../services/CRMModules/GetRFQGroups";
import { userLogged } from "../../utils";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-report',
  templateUrl: './RFQ.component.html',
  styleUrls: ['./RFQ.component.css']
})

export class RFQComponent {
  title = "RFQ";

  rfq_group: any = [];
  related_rfqs: any = [];
  account_id: any;
  user_type: string = "";

  constructor(private RFQGroupService: GetRFQGroupServices, private router: Router) {
    this.account_id = new userLogged().parseStorage(localStorage).AccountID;
    this.user_type = new userLogged().parseStorage(localStorage).UserType;

    const RFQG = this.RFQGroupService.GetRecordByBody({
      "ID":this.account_id,
      "Module":"Accounts",
      "Module_feilds":["Account_Name","Shipping_Country"],
      "Raleted_list": [
          {"api_related":"RFQs","Raleted_list_fields":["id","Title", "Created_Time"]}
      ]
    });
    RFQG.subscribe(res => {
      try {
        this.rfq_group = res["raleted_list"][0]["RFQs"];
      } catch (e) {
        this.rfq_group = null;
      }
    })
  }
}
