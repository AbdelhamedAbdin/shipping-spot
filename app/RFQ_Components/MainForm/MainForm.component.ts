// Built-in Angular Apps
import {Component, Injectable, Input} from '@angular/core';
import { userLogged } from "../../../utils";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-main-rfq-form',
  templateUrl: './MainForm.component.html',
  styleUrls: ['./MainForm.component.css']
})

export class MainFormComponent {
  @Input() is_selected: any;
}
