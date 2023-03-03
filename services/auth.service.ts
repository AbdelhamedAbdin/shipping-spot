import {HttpClient} from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataStorageName } from "../app/app.component";


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private BASE_URL = "../server/";
  path = "auth/sign-in";
  fullPath = this.BASE_URL + this.path;

  private LoginAuth = new BehaviorSubject<any>({username: "", password: ""});
  $LoginAuth = this.LoginAuth.asObservable();

  // Check if the user is authenticated
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  $isLoggedIn = this.isLoggedIn.asObservable(); // Listener for any event occurs

  constructor(private http: HttpClient) {
    const token = localStorage.getItem(DataStorageName);
    this.isLoggedIn.next(!!token);
  }

  login(_body: any): Observable<any>
  {
    return this.http.post<any>(this.fullPath, _body);
  }

  // Update main path and return a new url
  updateUrl(path: string): string
  {
    this.path = path;
    this.fullPath = this.BASE_URL + path;
    return this.fullPath;
  }

  // Check if user is already logged
  isLoggedInAuth(value: boolean)
  {
    return this.isLoggedIn.next(value);
  }

  decodeToken(access_token: string): Observable<any>
  {
    let re_path = this.updateUrl("auth/decodeToken");
    return this.http.post<any>(re_path, {"accessToken": access_token});
  }

  validateToken(access_token: string): Observable<any>
  {
    let re_path = this.updateUrl("auth/isValidToken");
    return this.http.post<any>(re_path, {"accessToken": access_token});
  }

  obtainNewToken(access_token: string): Observable<any>
  {
    let re_path = this.updateUrl("auth/refresh-access-token");
    return this.http.post<any>(re_path, {"accessToken": access_token});
  }
}
