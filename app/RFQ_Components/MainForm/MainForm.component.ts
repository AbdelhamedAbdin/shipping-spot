// Built-in Angular Apps
import {Component, Injectable, Input} from '@angular/core';
import { userLogged } from "../../../utils";
import {ControlContainer, FormBuilder, FormGroup, FormGroupDirective} from "@angular/forms";
import {RFQsService} from "../../../services/CRMModules/RFQs";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-main-rfq-form',
  templateUrl: './MainForm.component.html',
  styleUrls: ['./MainForm.component.css'],
  viewProviders: [
    { provide: ControlContainer, useExisting: FormGroupDirective },
  ],
})

export class MainFormComponent {
  parentForm!: FormGroup;
  stateOptions: any;

  constructor(
    private parent: FormGroupDirective,
    private fb: FormBuilder,
    RFQService: RFQsService
  ) {
    this.stateOptions = RFQService.PostData
  }
}
