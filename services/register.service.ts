import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {Router} from "@angular/router";
import { DataStorageName } from "../app/app.component";
import {Register} from "../app/interface-models/register_interface";

@Injectable({
  providedIn: 'root'
})

export class RegisterService implements OnInit {
  private BASE_URL = "../server/";
  path = "auth/sign-up";
  fullPath = this.BASE_URL + this.path;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  user_register = {
    Email: "",
    Password: "",
    First_Name: "",
    Full_Name: "",
    Last_Name: "",
    Phone: "",
    Account_Name: "",
    userType: ""
  }

  private RegisterUser = new BehaviorSubject<Register>(this.user_register);
  $RegisterUser = this.RegisterUser.asObservable();

  getRegisterData(observer: Register)
  {
    return this.RegisterUser.next(observer)
  }

  register(_body: Register): Observable<Register>
  {
    return this.http.post<any>(this.fullPath, _body, this.httpOptions);
  }
}
