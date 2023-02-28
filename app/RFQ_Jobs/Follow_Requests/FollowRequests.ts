// Built-in Angular Apps
import {Component, Injectable} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { userLogged } from "../../../utils";
import {SPQuotationListService} from "../../../services/CRMModules/SPQuotationList";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-follow-requests',
  templateUrl: './FollowRequests.html',
  styleUrls: ['./FollowRequests.css']
})

export class FollowRequests {
  title = "Follow Requests";
  service_type: any;
  data: any;
  account_id: string = "";
  quotation_records: any;
  rfq_user_type: any;

  constructor(private router: Router,
              private routeParam: ActivatedRoute,
              private SPQuotationList: SPQuotationListService) {
    this.account_id = new userLogged().parseStorage(localStorage).AccountID;
    this.getAllSpQuotations().subscribe(res => {
      this.quotation_records = res["raleted_list"][0]["Quotations"]
    })
  }

  getAllSpQuotations() {
    return this.SPQuotationList.GetRecordByBody({
      "ID": this.account_id,
      "Module": "Accounts",
      "Module_feilds": ["id", "Email"],
      "Raleted_list": [
        {"api_related": "Quotations", "Raleted_list_fields": ["Status", "Cancelation_Reason", "Expiry_Date", "id"]}
      ]
    })
  }

  nestedFunctionForRFQCreator(id: string): Observable<any> {
    var subject = new Subject<string>();
    this.SPQuotationList.GetRecordByBody({
      "ID": id,
      "Module": "RFQs",
      "Module_feilds": ["id", "User_Type", "Client"],
      "Raleted_list": [{}]
    }).subscribe(res => {
      subject.next(res)
    })
    return subject.asObservable();
  }

  getNameOfRFQCreator(id: string) {
    this.SPQuotationList.GetRecordByBody({
      "ID": id,
      "Module": "SP_Quotations",
      "Module_feilds": ["id", "RFQ"],
      "Raleted_list": [{}]
    }).subscribe(res => {
      this.nestedFunctionForRFQCreator(res["record"][0]["RFQ"].id).subscribe(resp => {
        this.rfq_user_type = resp["record"][0].User_Type;
        console.log(resp["record"][0].Client);
      })
    })
  }
}
