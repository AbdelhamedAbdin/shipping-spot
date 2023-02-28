import { HttpClient } from '@angular/common/http';
import { CRMBridgeService } from './CRMBridge.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable()
export class CRMRecordsService extends CRMBridgeService{
  Module = "";
  AllRecords: BehaviorSubject<any> = new BehaviorSubject(null);
  BaseURL="https://sandbox.zohoapis.com/crm/v3/";

  constructor(private httpClientRecords:HttpClient) {
    super(httpClientRecords);
  }

  UpdateURL()
  {
    this.BaseURL = this.BaseURL + this.Module;
  }

  GetRecords()
  {
    this.crmURL = this.BaseURL;
    this.crmMethod = "GET";
    this.UpdatePostData();
    this.DataSync();
  }
  GetRecordByID(recordID:string)
  {
    this.crmURL = this.BaseURL + "/" + recordID;
    this.crmMethod = "GET";
    this.crmBody = "";
    this.UpdatePostData();
    return this.DataSync();
  }
  GetRecordByBody(data: any) {
    this.crmURL = this.BaseURL;
    this.crmMethod = "POST";
    this.crmBody = data;
    this.UpdatePostData();
    return this.DataSync();
  }
  NewRecord(data:any)
  {
    this.crmURL=this.BaseURL;
    this.crmMethod="POST";
    this.crmBody=data;
    this.UpdatePostData();
    return this.DataSync();
  }
  UpdateRecord(recordID:string,data:any)
  {
    this.crmURL=this.BaseURL+"/"+recordID;
    this.crmMethod="PUT";
    this.crmBody=data;
    this.UpdatePostData();
    return this.DataSync();
  }
  UpsertRecord(data:any)
  {
    this.crmURL=this.BaseURL+"/upsert";
    this.crmMethod="POST";
    this.crmBody=data;
    this.UpdatePostData();
    this.DataSync();
  }
  SearchRecord(data:object)
  {
    this.crmURL=this.BaseURL+"/search?";
    let k: keyof typeof data;

    this.crmMethod="GET";
    this.crmBody="";
    this.UpdatePostData();
    this.DataSync();
  }
  DeleteRecord(recordID:string)
  {
    this.crmURL=this.BaseURL+"/"+recordID;
    this.crmMethod="DELETE";
    this.UpdatePostData();
    this.DataSync();
  }
  GetRecordImageURL(recordID:string)
  {
    return "../server/crm/image?module=" + this.Module + "&recordid=" + recordID;
  }
  override DataSync()
  {
    let res:Observable<any>=new Observable<any>();
    if(this.Method === "GET")
    {
      res = this.httpClientRecords.get(this.URL);
    }
    else if(this.Method === "POST")
    {
      res = this.httpClientRecords.post(this.URL, this.PostData);
    }
    else if(this.Method === "PUT")
    {
      res = this.httpClientRecords.put(this.URL,this.PostData);
    }
    else if(this.Method === "DELETE")
    {
      res = this.httpClientRecords.delete(this.URL);
    }
    return res;
    // res.subscribe((response:any)=>{
    //   this.Data.next(response["data"]);
    // })
  }
}
