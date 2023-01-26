// Built-in Angular Apps
import { Component, Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

// @login_redirect()
export class ProfileComponent {
  title = "Profile";
  @Input() user_request: any;

  constructor() {

  }
}
