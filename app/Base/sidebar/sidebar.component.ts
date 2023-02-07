import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {OutletReader} from "../../../utils";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
  @Input() user_request: any;
  @Input() hasRoute: any;
  @Input() sidebar_icon: any;
  router: any;
  resolver: any;


  constructor(private elementRef: ElementRef,
              private authService: AuthService) {
    this.router = new Router();
    this.resolver = new OutletReader(this.router);
  }

  logout()
  {
    localStorage.clear()
    this.authService.isLoggedInAuth(false);
    this.router.navigateByUrl(this.resolver.ResolverURL("login", false));
  }

  toggleNavbar() {
    const main_wrapper = document.getElementById("main-wrapper") as HTMLElement;
    const nav_toggler_i = document.querySelector(".nav-toggler i") as HTMLElement;

    main_wrapper.classList.toggle("show-sidebar");
    nav_toggler_i.classList.toggle("ti-menu");
  }

  setSidebarType() {
    const screen = window.screen;
    const width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    let main_wrapper = document.getElementById("main-wrapper") as HTMLElement;
    const main_wrapper_data = main_wrapper.dataset;

    if (width < 1170) {
        main_wrapper.setAttribute("data-sidebartype", "mini-sidebar");
    } else {
        main_wrapper.setAttribute("data-sidebartype", "full");
    }
  }

  ngOnInit() {
    let setSidebar_type: Function = this.setSidebarType;
    setSidebar_type();

    // this.elementRef.nativeElement.window.onresize = function () {
    //   setSidebar_type();
    // }
  }
}
