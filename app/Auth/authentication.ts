// Custom auth for Provider
import {OutletReader} from "../../utils";

export function provider_auth(user_type: any, router: any) {
  const resolver = new OutletReader(router);

  if (is_authenticated(user_type) && user_type !== 'provider') {
    router.navigate(['/profile', user_type]);
  }
  // else {
  //   router.navigateByUrl(resolver.ResolverURL("login", false));
  // }
}

// User is Logged-in
export function is_authenticated(user_type: string): boolean {
  return user_type !== '';
}
