// Built-in Angular Apps
import { Component, Injectable } from '@angular/core';
import { GetRFQGroupServices } from "../../services/CRMModules/GetRFQGroups";
import { userLogged } from "../../utils";
import { Router } from "@angular/router";
import {SearchRecordsService} from "../../services/CRMModules/SearchRecords";
import {SPQuotationRFQListService} from "../../services/CRMModules/SPQuotationRFQList";
import {UpdateSPQuotationService} from "../../services/CRMModules/updateSPQuotation";


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
  account_id: any;
  user_type: string = "";
  rfq_list: any = [];
  related_sp: any = {
    raleted_list:
    [{
      SP_Quotations: [{id: "-", Service_Provider: {name: "-"}, Status: "-", Price_Validity: "-"}]
    }]
  };

  constructor(private RFQGroupService: GetRFQGroupServices,
              private SearchRecords: SearchRecordsService,
              private SPQuotationRFQList: SPQuotationRFQListService,
              private UpdateSPQuotation: UpdateSPQuotationService) {
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

    RFQG.subscribe((res: any) => {
      try {
        this.rfq_group = res["raleted_list"][0]["RFQs"];
        if (this.rfq_group === "No Data") {
          this.rfq_group = [];
          return
        }
      } catch (e) {
        this.rfq_group = null;
      }
    });

    // Get List of RFQs
    this.getRFQRecords().subscribe((res) => {
      this.rfq_list = res['data'];
    })
  }

  getRFQRecords() {
    const search_records = this.SearchRecords.GetRecordByID(`search?criteria=(Client:equals:${this.account_id})`)
    return search_records;
  }

  getSPQuotationRecords(rec: any): any {
    this.SPQuotationRFQList.GetRecordByBody({
      "ID":rec,
      "Module":"RFQs",
      "Module_feilds":["id"],
      "Raleted_list": [
          {"api_related":"SP_Quotations","Raleted_list_fields":["id", "Service_Provider", "Status", "Price_Validity"]}
      ]
    }).subscribe(res => {
      console.log(res);
      try {
        this.related_sp = res["raleted_list"][0]["SP_Quotations"];
      }
      catch (e) {this.related_sp = []}
    })
  }

  // Converter to increment number above zero
  convertToInteger(num: any) {
    return parseInt(num);
  }

  // Validation for None values
  getValueOrNone(val: any) {
    if (val !== null) {
      return val;
    }
    return "-";
  }

  // Show sp_quotations depending on its own target
  expandAccordion($this: any) {
    let acc_body = document.querySelectorAll(".accordian-body");

    acc_body.forEach(b => {
      b.classList.remove("show");
    });
    $this.target.classList.add("show");
  }

  updateStatus(status: {Status: string, SP_Quotations: string}) {

    let payload = {
        data: [{Status: status.Status}],
        trigger: ['workflow']
      }

    this.UpdateSPQuotation.UpdateRecord(status.SP_Quotations, payload)
      .subscribe((res: any) => console.log(res));
  }

  displayClient(sp: any) {
    if (this.user_type === "client" && sp.Status === "Completed") {
      return sp.Service_Provider.name;
    }
    else if (this.user_type === "provider") {
      return sp.Service_Provider.name;
    }
    return "******";
  }

}
