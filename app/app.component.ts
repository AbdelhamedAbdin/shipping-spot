// ShippingSpot Services
import { AuthService } from "../services/auth.service";
// Built-in Angular Apps
import { Component, ElementRef, Input, OnInit } from '@angular/core';
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

  constructor(private router: Router,
              public authService: AuthService,
              private elementRef: ElementRef)
  {
    this.authService.$isLoggedIn.subscribe(auth => {this.is_authenticated = auth});
    this.token = localStorage.getItem(DataStorageName);
    this.svg_icon = svg_icons;
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

  hasRoute(router: string): boolean {
    return this.currentRouter === router;
  }

  userRequest() {
    return {
      is_authenticated: this.is_authenticated,
      user_data: this.originData
    }
  }
}

// @ts-ignore
export { DataStorageName };
