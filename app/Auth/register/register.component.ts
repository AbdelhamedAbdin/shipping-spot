// Built-in Angular Apps
import {Component, Injectable, OnInit} from '@angular/core';
import { Router } from "@angular/router";
// ShippingSpot Apps
import { Register } from "../../interface-models/register_interface";
import { RegisterService } from "../../../services/register.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  title: string = "Register";
  selectedRole: string = "";
  msgError: string = "";

  roles = [
    {option: "Client"},
    {option: "Service Provider"}
  ]

  constructor(private registerService: RegisterService, private router: Router) {
    this.selectedRole = this.roles[0].option;
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
      this.router.navigate(["/"]);
    });
  }
}

