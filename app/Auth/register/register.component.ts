// Built-in Angular Apps
import {Component, Injectable, OnInit} from '@angular/core';
import { Router } from "@angular/router";
// ShippingSpot Apps
import { Register } from "../../interface-models/register_interface";
import { RegisterService } from "../../../services/register.service";
import {OutletReader} from "../../../utils";
import {AppComponent} from "../../app.component";
import {Location} from "@angular/common";
import {AuthService} from "../../../services/auth.service";
import {ContactsService} from "../../../services/CRMModules/Contacts";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  title: string = "Register";
  selectedRole: string = "";
  msgError: string = "";
  resolver: any;
  app_component: any;

  roles = [
    {option: "Client"},
    {option: "Service Provider"}
  ]

  constructor(private registerService: RegisterService,
              private router: Router,
              private location: Location, private authService: AuthService,
              private contactsService: ContactsService) {
    this.selectedRole = this.roles[0].option;
    this.resolver = new OutletReader(this.router);
    // @ts-ignore
    this.app_component = new AppComponent(this.router, this.authService, this.contactsService);
  }

  ngOnInit() {
    this.resolver.navigateTo(
      "register",
      this.location.path(),
      this.app_component.is_authenticated,
      "profile"
    );
  }

  register(account_data: Register)
  {
    this.registerService.register(account_data).subscribe(user => {
      console.log("Register has been successfully");
    }, error => {
      if (error.error === "Duplicate Data")
      {
        window.scrollTo(0, 0)
        this.msgError = "Invalid form. Please re-correct the invalid fields and try again";
      }
    }, () => {
      this.router.navigateByUrl(this.resolver.ResolverURL("login", false));
    });
  }
}

