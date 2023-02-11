// Built-in Angular Apps
import { Component, Injectable, OnInit } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import {RFQGroupService} from "../../services/CRMModules/RFQGroup";
import {userLogged} from "../../utils";
// ShippingSpot Apps
import { rfq_group_listener } from '../app.component';
import { filter, tap } from 'rxjs/operators';


@Component({
  selector: 'app-page-title',
  templateUrl: './pageTitle.component.html',
  styleUrls: ['./pageTitle.component.css']
})

export class PageTitleComponent {
  title: string = "Page-Title";
  rfq_group: any;
  account_id: any;

  constructor(private RFQGroupService: RFQGroupService, private router: Router) {
    try {
      this.account_id = new userLogged().parseStorage(localStorage).AccountID;
    } catch (e) {
      this.account_id = "";
    }

    const RFQG = this.RFQGroupService.GetRecordByID("search?criteria=(Account:equals:" + this.account_id + ")");
    RFQG.subscribe(res => {
      this.rfq_group = res["data"];
    })
  }

  createRfqGroup(rfq_group: {Title: string})
  {
    const _body = {
      data: [{Title: rfq_group.Title, Account: {id: this.account_id}}],
      trigger: ["workflow"]
    };
    this.RFQGroupService.NewRecord(_body).subscribe(res => {
      console.log(res["data"]);
    },error => {}, () => {
      this.router.navigateByUrl("/rfq")
    });
  }
}

