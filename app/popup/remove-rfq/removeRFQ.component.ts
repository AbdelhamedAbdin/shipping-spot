// Built-in Angular Apps
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import {RFQGroupService} from "../../../services/CRMModules/RFQGroup";
import {GetRFQGroupServices} from "../../../services/CRMModules/GetRFQGroups";
import {userLogged} from "../../../utils";


@Component({
  selector: 'app-page-remove-rfq',
  templateUrl: './removeRFQ.component.html',
  styleUrls: ['./removeRFQ.component.css']
})

export class RemoveRFQComponent {
  title: string = "Page-Remover";
  rfq_group: any = [];
  account_id: any;
  group_id: string = "";

  constructor(private router: Router) {

    this.getAccountIdOrNone();
  }

  getAccountIdOrNone() {
    try {
      this.account_id = new userLogged().parseStorage(localStorage).AccountID;
    } catch (e) {
      this.account_id = "";
    }
  }


}

