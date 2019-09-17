import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (sessionStorage.getItem('AuthAuthorities') && sessionStorage.getItem('AuthToken')) {
      // logged in so return true
      return true;
    }

    // this.authAuthorities = (JSON.parse(sessionStorage.getItem('AuthAuthorities')))[0].authority;
    // this.authToken = sessionStorage.getItem('AuthToken');
    // this.authUsername = sessionStorage.getItem('AuthUsername');

    // not logged in so redirect to login page with the return url and return false
    this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
