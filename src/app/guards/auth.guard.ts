import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { devLog } from '../core/functions/development_logs';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private userService: AuthService) {

  }

  /* We are using canActivate guard to be sure that the user is logged in 
   * before accessing the ship list component
  */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    devLog(state.url);
    if (this.userService.user) {
      return true;
    }
    this.router.navigate(['/account/login']).then(r => null);
    return false;
  }

}
