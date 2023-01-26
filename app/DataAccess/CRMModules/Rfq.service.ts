import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { CRMRecordsService } from '../CRMRecords.service';

@Injectable()
export class ContactsService extends CRMRecordsService{

  constructor(private httpLead:HttpClient) {
    super(httpLead);
    this.Module = "Rfq";
    this.UpdateURL();
  }
}
