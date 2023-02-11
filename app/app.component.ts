// ShippingSpot Services
import { AuthService } from "../services/auth.service";
// ShippingSpot Other Files
import { OutletReader, pathNameValidation } from '../utils';
// Built-in Angular Apps
import {Component, ElementRef, Input, OnInit, Output} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import * as svg_icons from "@fortawesome/free-solid-svg-icons";
import { filter } from 'rxjs/operators';
import { ContactsService } from "../services/CRMModules/Contacts";
import { HttpClient } from "@angular/common/http";


const DataStorageName = "user_login";
let rfq_group_listener: any = ""

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
  contact_name: string = "";
  user_role: string = "";
  @Input() user_request: any;

  constructor(private router: Router,
              public authService: AuthService,
              private contactsService: ContactsService)
  {
    this.authService.$isLoggedIn.subscribe(auth => {this.is_authenticated = auth});
    this.token = localStorage.getItem(DataStorageName);
    this.svg_icon = svg_icons;
    this.get_url_name = new OutletReader(router);

    try {
      const user_payloads = JSON.parse(localStorage.user_payloads);
      const userID = user_payloads.userID;
      const contact_service = this.contactsService.GetRecordByID(userID);

      this.user_role = user_payloads.UserType;
      contact_service.subscribe(res => {
        res["data"].forEach((item: { Full_Name: any; }) => {
          this.contact_name = item.Full_Name;
        })
      });
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

  logout()
  {
    localStorage.clear()
    this.authService.isLoggedInAuth(false);
    this.router.navigateByUrl(this.get_url_name.ResolverURL("login", false));
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

// @ts-ignore
export { DataStorageName, rfq_group_listener };
