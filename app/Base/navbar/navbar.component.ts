import { Component, ElementRef, Input } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {

  constructor(private elementRef: ElementRef, private authService: AuthService) {}

  sidebarComp = new SidebarComponent(this.elementRef, this.authService);
  @Input() navbar_icons: any; // [icons]=....
  @Input() user_request: any;
  @Input() hasRoute: any;
  @Input() toggle_sidebar = this.sidebarComp;
}
