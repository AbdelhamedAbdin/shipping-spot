import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { CRMRecordsService } from '../CRMRecords.service';


// @Injectable()
// export class ContactsService extends CRMRecordsService{
//
//   constructor(private httpLead:HttpClient) {
//     super(httpLead);
//     this.Module = "Contacts"
//     this.UpdateURL();
//   }
// }

@Injectable({
  providedIn: "root"
})

export class ContactsService extends CRMRecordsService {

  constructor(private httpLead:HttpClient) {
    super(httpLead);
    this.Method = "GET";
    this.Module = "Contacts";
    this.UpdateURL();  // "https://sandbox.zohoapis.com/crm/v3/" + this.Module
  }

}
