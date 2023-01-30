// ShippingSpot Services
import { AuthService } from "../services/auth.service";
// ShippingSpot Other Files
import { OutletReader, pathName } from '../utils';
// Built-in Angular Apps
import {Component, ElementRef, OnInit} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import * as svg_icons from "@fortawesome/free-solid-svg-icons";
import { filter } from 'rxjs/operators';


const DataStorageName = "user_login";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  protected token: any = {};
  title = 'shipping-portal';
  is_authenticated: boolean = false;
  originData: any = {};
  svg_icon: any;
  currentRouter: any;
  get_url_name: any;

  constructor(private router: Router, public authService: AuthService)
  {
    this.authService.$isLoggedIn.subscribe(auth => {this.is_authenticated = auth});
    this.token = localStorage.getItem(DataStorageName);
    this.svg_icon = svg_icons;
    this.get_url_name = new OutletReader(router);
  }

  ngOnInit(): void {
    // Find access-token key in local-storage
    Object.keys(localStorage).map(acc_token => {
      if (acc_token === DataStorageName) {
        // decode token to readable data
        this.authService.decodeToken(this.token).subscribe(user_payload => {
          this.originData = user_payload;
        });

        // Validate token
        this.authService.validateToken(this.token).subscribe(tokn => {
          if (!tokn) {
            // Renew token after expiry date
            this.authService.obtainNewToken(this.token).subscribe(new_token => {
              localStorage.removeItem(DataStorageName);
              localStorage.setItem(DataStorageName, new_token);
            })
          }
        })
      }
    });

    // Get the current path
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      ).subscribe(e => {
        // @ts-ignore
        this.currentRouter = e.url;
    })
  }

  routeName(name: string): any {
    let path_name = new pathName(this.router).resolve(this.currentRouter, name);
    return path_name;
  }

  userRequest()
  {
    return {
      is_authenticated: this.is_authenticated,
      user_data: this.originData
    }
  }
}

// @ts-ignore
export { DataStorageName };
