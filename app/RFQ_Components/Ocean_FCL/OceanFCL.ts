// Built-in Angular Apps
import { Component, Injectable } from '@angular/core';
import {selectServiceType} from "../run_event";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-ocean-fcl',
  templateUrl: './OceanFCL.html',
  styleUrls: []
})

export class OceanFCL {

  constructor() {
    selectServiceType(this);
  }
}
