// Built-in Angular Apps
import {Component, Injectable, Input, OnInit} from '@angular/core';
// API Services
import { ContactsService } from "../../services/CRMModules/Contacts";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {OutletReader} from "../../utils";
import {AppComponent} from "../app.component";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  title = "Profile";
  user_payloads = JSON.parse(localStorage.user_payloads);
  user_role: string = this.user_payloads.UserType;
  @Input() user_request: any;
  resolver: any;
  app_component: any;

  constructor(private authService: AuthService, private router: Router, private location: Location,
              private contactsService: ContactsService) {
    this.resolver = new OutletReader(this.router);
    // @ts-ignore
    this.app_component = new AppComponent(this.router, this.authService, contactsService);
  }

  ngOnInit() {
    if (this.app_component.is_authenticated) {
      this.router.navigateByUrl(this.resolver.ResolverURL(this.user_role, false));
    }
  }
}
