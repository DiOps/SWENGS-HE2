import { map } from 'rxjs/operators';
import { UserService } from './service/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ReturnStatement } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.isLoggedIn.pipe(
      map((isLoggedIn) => {
        if (!isLoggedIn) {
          this.router.navigate(['login']);
        }
        return isLoggedIn;
      })
    );
  }

  constructor(private userService: UserService, private router: Router) {
  }
}
