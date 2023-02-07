import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// Services API
import { CRMRecordsService } from '../../DataAccess/CRMRecords.service'

@Injectable({
  providedIn: "root"
})

export class RFQGroupService extends CRMRecordsService {

  constructor(private httpLead:HttpClient) {
    super(httpLead);
    this.Module = "RFQ_Group";
    // this function will update URL by appended a new Module with it
    this.UpdateURL();  // "https://sandbox.zohoapis.com/crm/v3/" + this.Module
  }


}
