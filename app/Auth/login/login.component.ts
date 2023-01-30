// ShippingSpot Services
import { AuthService } from '../../../services/auth.service';
// Built-in Angular Apps
import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import { DataStorageName, AppComponent } from '../../app.component'
import { OutletReader } from "../../../utils";
import { Location } from '@angular/common';


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

  constructor(private authService: AuthService, private router: Router, private location: Location) {
    this.resolver = new OutletReader(this.router);
    this.app_component = new AppComponent(this.router, this.authService);
  }

  ngOnInit() {
    this.resolver.navigateTo("login", this.location.path(),this.app_component.is_authenticated, "profile");
  }

  // getUrl(path: string) {
  //   return new OutletReader(this.router).ResolverURL(path);
  // }

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
        console.log(Object.keys(res.accessToken).length === 0);
        if (Object.keys(res.accessToken).length === 0)
        {
          this.error_login = true;
        }
        else
        {
          this.authService.isLoggedInAuth(true);
          localStorage.setItem(DataStorageName, res.accessToken);
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
      // this.router.navigate([this.getUrl('profile')]);
      this.router.navigateByUrl(this.resolver.ResolverURL("profile", false));
    });
  }
}
