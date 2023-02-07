// ShippingSpot Services
import { AuthService } from '../../../services/auth.service';
// Built-in Angular Apps
import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import { DataStorageName, AppComponent } from '../../app.component'
import { OutletReader } from "../../../utils";
import { Location } from '@angular/common';
import {ContactsService} from "../../../services/CRMModules/Contacts";


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

  constructor(private authService: AuthService, private router: Router,
              private location: Location, private contactsService: ContactsService)
  {
    this.resolver = new OutletReader(this.router);
    // @ts-ignore
    this.app_component = new AppComponent(this.router, this.authService, this.contactsService);
  }

  ngOnInit() {
    this.resolver.navigateTo(
      "login",
      this.location.path(),
      this.app_component.is_authenticated,
      "profile"
    );
    console.log("this is loggin path");
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
    }, error => {
      console.log(error)
    }, () => {
      if (this.error_login)
      {
        this.invalid_login = "Username or Password are invalid"
        return;
      }
      this.router.navigateByUrl(this.resolver.ResolverURL(this.user_payloads.UserType, false));
    });
  }
}
