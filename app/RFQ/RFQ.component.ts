// Built-in Angular Apps
import { Component, Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {rfqs} from "./demo";
import {ContactsService} from "../../services/CRMModules/Contacts";
import {RFQGroupService} from "../../services/CRMModules/RFQGroup";
import { rfq_group } from "./demo";
import {userLogged} from "../../utils";
import {filter, tap} from "rxjs/operators";
import {NavigationEnd, NavigationStart, Router} from "@angular/router";

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

  rfq_group = rfq_group;
  related_rfqs: any = [];
  RFQs = rfqs
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
