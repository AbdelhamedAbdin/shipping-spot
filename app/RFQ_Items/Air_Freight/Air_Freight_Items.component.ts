// Built-in Angular Apps
import {Component, Injectable, Input} from '@angular/core';
import { userLogged } from "../../../utils";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-air-freight-item',
  templateUrl: './Air_Freight_Items.component.html',
  styleUrls: ['./Air_Freight_Items.component.css']
})


export class Air_Freight_Items {
  constructor() {}
}
