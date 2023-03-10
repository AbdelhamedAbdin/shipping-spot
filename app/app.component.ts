// ShippingSpot Services
import { AuthService } from "../services/auth.service";
// ShippingSpot Other Files
import { OutletReader, pathNameValidation } from '../utils';
// Built-in Angular Apps
import {Component, Input, OnInit} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import * as svg_icons from "@fortawesome/free-solid-svg-icons";
import { filter } from 'rxjs/operators';
import {SpinnerComponent} from "./popup/spinner/Spinner.component";


let DEBUG: boolean = true;
let DOMAIN: string = "sandbox";

// Live Server
if (!DEBUG) {
  DOMAIN = "";
}

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
  user_role: string = "";
  @Input() user_request: any;
  spinner = new SpinnerComponent();

  constructor(private router: Router, public authService: AuthService)
  {
    this.authService.$isLoggedIn.subscribe(auth => {this.is_authenticated = auth});
    this.token = localStorage.getItem(DataStorageName);
    this.svg_icon = svg_icons;
    this.get_url_name = new OutletReader(router);

    try {
      const user_payloads = JSON.parse(localStorage.user_payloads);
      this.user_role = user_payloads.UserType;
    } catch (e) {
      return;
    }
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

  // Route to url if it is valid
  routeName(name: string): any {
    return new pathNameValidation(this.router).resolve(this.currentRouter, name);
  }

  userRequest()
  {
    return {
      is_authenticated: this.is_authenticated,
      user_data: this.originData
    }
  }

  hasRoute(router: string): boolean {
    return this.currentRouter === router;
  }

  logout()
  {
    localStorage.clear()
    this.authService.isLoggedInAuth(false);
    this.router.navigateByUrl(this.get_url_name.ResolverURL("login", false));
    this.Reloader();
  }

  // Reload system for login again
  Reloader() {
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }

  // close sidebar
  closed_sidebar() {
    const shipping_logo = document.getElementById("shipping-logo");
    // @ts-ignore
    shipping_logo.classList.toggle("d-none");
  }

  // Sidebar Animation
  arrow_rotation(event: any) {
    event.target.closest(".heading-content").querySelector(".caret-left")
      .classList.toggle("transform-caret-left");

    console.log(event.target.closest(".heading-content").querySelector(".caret-left"));
    const target_elem = event.target.closest(".heading-content");
    // const get_aria_attrs = document.querySelectorAll(".heading-content > a");
  }
}

export { DataStorageName, DOMAIN };
