// ShippingSpot Services
import { AuthService } from '../../../services/auth.service';
// Built-in Angular Apps
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DataStorageName, AppComponent } from '../../app.component'
import { OutletReader, userLogged } from "../../../utils";
import { Location } from '@angular/common';
import { ContactsService } from "../../../services/CRMModules/Contacts";


@Component({
  selector: 'app-header-component',
  templateUrl: './Header.html',
  styleUrls: ['./Header.css']
})

export class HeaderComponent {
  user_payloads: any;
  user_role: string = "";
  contact_name: string = "";

  constructor(private contactsService: ContactsService) {
    try {
      const user_payloads = JSON.parse(localStorage.user_payloads);
      const userID = user_payloads.userID;
      const contact_service = this.contactsService.GetRecordByID(userID);

      this.user_role = user_payloads.UserType;
      contact_service.subscribe(res => {
        // this.contact_name = res["data"][0].Full_Name;
        this.contact_name = res["data"][0].Full_Name;
      });
    } catch (e) {
      return;
    }
  }
}
