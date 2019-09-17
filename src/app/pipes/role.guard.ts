import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (sessionStorage.getItem('AuthAuthorities')) {
      console.log('inside the first condition');
      console.log((JSON.parse(sessionStorage.getItem('AuthAuthorities')))[0].authority);
      console.log(next.data.role);
      if ((JSON.parse(sessionStorage.getItem('AuthAuthorities')))[0].authority === next.data.role) {
        console.log('inside the last condition');
        return true;
      }
    }

    this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } });
    return false;

  }
}
