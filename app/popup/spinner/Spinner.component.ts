// Built-in Angular Apps
import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './Spinner.component.html',
  styleUrls: ['./Spinner.component.css']
})

export class SpinnerComponent {
  title: string = "spinner";

  constructor() {}

  startSpinnerLoading() {
    const LOADER = document.querySelector(".spinner-layer") as HTMLElement;
    LOADER.classList.add("d-block");
    document.body.style.overflowY = "hidden";
  }

  endSpinnerLoading() {
    const LOADER = document.querySelector(".spinner-layer") as HTMLElement;
    LOADER.classList.remove("d-block");
    document.body.style.overflowY = "auto";
  }

  ready(fn: any) {
    if (document.readyState !== 'loading'){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

}
