// Built-in Angular Apps
import { Component, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-ocean-fcl',
  templateUrl: './OceanFCL.html',
  styleUrls: []
})

export class OceanFCL {
  is_select: boolean = false;

  constructor() {
    let $this = this;
    window.onchange = function (e) {
      // @ts-ignore
      const type_service = e.target.value, type_service_name = e.target.name;

      if (type_service_name === "Service_Type") {
        type_service !== "-- None --" ? $this.is_select = true : $this.is_select = false;
      }
    }
  }
}
