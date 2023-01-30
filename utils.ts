import {Router} from "@angular/router";
import {routes} from "./app/app-routing.module";

export class OutletReader {
  constructor(private router: Router) {}

  UpdateOutletConfig(base: boolean = true) {
    let Routes = routes;

    let prefix: string = "";
    if (base) {
      prefix = "/app";
    }

    return Routes.map(value => {
      let get_outlet_url;
      let outlet_value;

      if (value.path !== "") {
        get_outlet_url = prefix + "/(" + value.outlet + ":" + value.path + ")";
      } else {
        get_outlet_url = "/";
      }
      outlet_value = [[value.outlet, get_outlet_url]];
      // @ts-ignore
      value["name"] = Object.fromEntries(outlet_value); // name: {"register": "/app/signup/"}

      return {
        path: value.path,
        component: value.component,
        outlet: value.outlet,
        // @ts-ignore
        name: value.name
      }
    })
  }

  // Get full pathName by outlet-name or raise an error
  ResolverURL(name: any, base: boolean = true) {
    let currentRoutes = this.UpdateOutletConfig(base);
    let route_name = null;

    let find_name = currentRoutes.filter(route => {
      if (route.outlet === name) {
        return name;
      }
    })

    try {
      route_name = Object.keys(find_name[0].name);
      return find_name[0].name[route_name];
    }
    catch (e) {
      throw "Routing error";
    }
  }

  hasRoute(currentRouter: string, name: string): boolean
  {
    return "/app" + currentRouter === this.ResolverURL(name);
  }

  navigateTo(resolver_path: string, location: string, is_auth: boolean, nav_to: string) {
      const resolver = this.ResolverURL(resolver_path); // path
      const current_location = location; // current location

      if (resolver === "/app" + current_location && is_auth) {
        this.router.navigateByUrl(this.ResolverURL(nav_to, false));
      }
    }
}

export class pathName extends OutletReader {
  constructor(private routers: Router) {
    super(routers);
  }
  // Apply the ResolverURL logic
  resolve(current_route: string, name: string) {
    return this.hasRoute(current_route, name);
  }
}
