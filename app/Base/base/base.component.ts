import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {OutletReader} from "../../../utils";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html'
})

export class BaseComponent implements OnInit {
  resolver: any;
  app_component: any;

  constructor(private authService: AuthService, private router: Router, private location: Location)
  {
    this.resolver = new OutletReader(this.router);
    // @ts-ignore
    this.app_component = new AppComponent(this.router, this.authService, ...args);
  }

  ngOnInit() {
    let is_auth = this.app_component.is_authenticated;
    let routing = this.router;
    let resolving = this.resolver;

    window.addEventListener("DOMContentLoaded", function (e) {
    if (is_auth)
    {
      routing.navigateByUrl(resolving.ResolverURL("profile", false));
    }
    else
    {
      routing.navigateByUrl(resolving.ResolverURL("login", false));
    }
    })
  }
}
