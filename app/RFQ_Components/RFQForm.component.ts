// Built-in Angular Apps
import { Component, Injectable } from '@angular/core';
import { RFQGroupService } from "../../services/CRMModules/RFQGroup";
import { userLogged } from "../../utils";
import { Router, ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-rfq-form',
  templateUrl: './RFQForm.component.html',
  styleUrls: ['./RFQForm.component.css']
})

export class RFQFormComponent {
  title: string = "";

  constructor(private activatedRoute: ActivatedRoute) {
    console.log(this.activatedRoute.snapshot.paramMap.get('service_name'));
  }
}
