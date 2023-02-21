import { HttpClient } from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
// Services API
import { CRMRecordsService } from '../../DataAccess/CRMRecords.service';

@Injectable({
  providedIn: "root"
})

export class GetRFQGroupServices extends CRMRecordsService {
  constructor(private httpLead: HttpClient) {
    super(httpLead);
    this.Module = "";
    this.BaseURL = "https://sandbox.zohoapis.com/crm/v2/functions/get_record_with_raleted_list/actions/execute?auth_type=apikey&zapikey=1003.65ae4ee653d34665e6c303409c6762d7.f962cede729f9600a4ce03f8adfa57dd";
    this.UpdateURL();
  }
}
