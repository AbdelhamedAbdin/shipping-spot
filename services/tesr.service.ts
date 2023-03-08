import {HttpClient, HttpContextToken, HttpContext, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TestService {
  constructor(private http: HttpClient) {}

  requestMethod(url: string): HttpRequest<any> {
    let http_request = new HttpRequest("GET", url, {init: {
      context: {"key": "value"}
    }, arrayBuffer: "json"});
    return http_request;
  }

}
