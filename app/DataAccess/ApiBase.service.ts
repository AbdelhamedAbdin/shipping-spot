import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, observable, Observable } from 'rxjs';


@Injectable()
export class ApiBaseService {
  Data: BehaviorSubject<any> = new BehaviorSubject(null);
  PostData: any;
  Method: "GET" | "DELETE" | "PUT" | "POST"="GET";
  URL: string="";

  constructor(private httpClient:HttpClient) { }

  DataSync()
  {
    let res: Observable<any> = new Observable<any>();
    if(this.Method==="GET")
    {
      res = this.httpClient.get(this.URL, this.PostData);
    }
    else if(this.Method==="POST")
    {
      res = this.httpClient.post(this.URL,this.PostData);
    }
    else if(this.Method==="PUT")
    {
      res = this.httpClient.put(this.URL,this.PostData);
    }
    else if(this.Method==="DELETE")
    {
      res = this.httpClient.delete(this.URL);
    }
    res.subscribe((response:any)=>{
      this.Data.next(response);
    })
  }
}
