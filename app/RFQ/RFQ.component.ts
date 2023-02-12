// Built-in Angular Apps
import { Component, Injectable } from '@angular/core';
import { RFQGroupService } from "../../services/CRMModules/RFQGroup";
import { userLogged } from "../../utils";
import { NavigationEnd, Router } from "@angular/router";

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

  constructor(private RFQGroupService: RFQGroupService, private router: Router) {
    this.account_id = new userLogged().parseStorage(localStorage).AccountID;

    const RFQG = this.RFQGroupService.GetRecordByID("search?criteria=(Account:equals:" + this.account_id + ")");
    RFQG.subscribe(res => {
      this.rfq_group = res["data"];
    })
  }

  // close RFQ Details section
  resetRFQDetails() {this.related_rfqs = []}
}
