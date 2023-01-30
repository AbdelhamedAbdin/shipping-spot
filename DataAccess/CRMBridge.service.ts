import { HttpClient } from '@angular/common/http';
import { ApiBaseService } from './ApiBase.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CRMBridgeService extends ApiBaseService {
  crmURL="";
  crmMethod="";
  crmBody="";

  constructor(private httpBridgeClient:HttpClient) {
    super(httpBridgeClient);
    this.Method = "POST"; // Default method value
    this.URL="../server/crm/crmapi"; // coming from server itself, don't override this unless it wasn't using the same path
  }

  UpdatePostData()
  {
    this.PostData = {
      url: this.crmURL,
      method: this.crmMethod,
      body: this.crmBody
    }
  }
}
