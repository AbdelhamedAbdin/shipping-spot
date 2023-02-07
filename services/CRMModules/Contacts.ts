import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// Services API
import { CRMRecordsService } from '../../DataAccess/CRMRecords.service'
import {Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})

export class ContactsService extends CRMRecordsService {

  constructor(private httpLead:HttpClient) {
    super(httpLead);
    this.Module = "Contacts";
    // this function will update URL by appended a new Module with it
    this.UpdateURL();  // "https://sandbox.zohoapis.com/crm/v3/" + this.Module
  }

  userAccountData() {
    const user_payloads = JSON.parse(localStorage.user_payloads);
    const accountID = user_payloads.AccountID;

    this.GetRecordByID(accountID).subscribe(res => {
      return res["data"]
    })
  }

  userContactData() {
    const user_payloads = JSON.parse(localStorage.user_payloads);
    const userID = user_payloads.userID;

    this.GetRecordByID(userID).subscribe(res => {
      return res["data"]
    })
  }
}
