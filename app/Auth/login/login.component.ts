// ShippingSpot Services
import { AuthService } from '../../../services/auth.service';
// Built-in Angular Apps
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { DataStorageName, AppComponent } from '../../app.component'
import { OutletReader, userLogged } from "../../../utils";
import { Location } from '@angular/common';
import { ContactsService } from "../../../services/CRMModules/Contacts";
import {Observable} from "rxjs";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
  error_login: boolean = false;
  invalid_login: string = "";
  resolver: any;
  app_component: any;
  user_payloads: any;
  user_role: any;

  constructor(private authService: AuthService, private router: Router)
  {
    this.resolver = new OutletReader(this.router);
    this.app_component = new AppComponent(this.router, this.authService);
    this.navigateProfile()
  }

  // Route to profile based on user role
  navigateProfile() {
    try {
      this.user_role = new userLogged().parseStorage(localStorage).UserType;
    }
    catch (e) {
      this.user_role = null;
    }
  }

  ngOnInit() {
    if (localStorage.getItem(DataStorageName)) {
      this.router.navigateByUrl('profile/' + this.user_role);
    }
  }

  login(login: {username: string, password: string})
  {
    const _body = {"username": login.username, "password": login.password}
    // user login
    this.authService.login(_body).subscribe(res =>
    {
      // check if data is valid
      if (res.accessToken)
      {
        // store data token
        if (Object.keys(res.accessToken).length === 0)
        {
          this.error_login = true;
        }
        else
        {
          this.authService.isLoggedInAuth(true);
          localStorage.setItem(DataStorageName, res.accessToken);
          localStorage.setItem("user_payloads", JSON.stringify(res.user));
          this.user_payloads = res.user;
        }
      }
    }, error => {}, () =>
    {
      if (this.error_login)
      {
        this.invalid_login = "Username or Password are invalid";
        return;
      }
      this.router.navigateByUrl("profile/" + this.user_payloads.UserType);
      setTimeout(() => window.location.reload(), 100);
    });
  }
}
