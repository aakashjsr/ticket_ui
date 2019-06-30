import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserRoles } from '../../utils/userRoles';
import { MatSnackBar } from '@angular/material';
import { UtilsService } from '../utils.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private utils: UtilsService,
    public router: Router, private snackBar: MatSnackBar) { }

  isAuthorized(expectedRoles: Array<UserRoles>): boolean {
    const currentRole = this.utils.getCookie('user_type');
    let isAllowed = false;
    expectedRoles.forEach((role: UserRoles) => {
      if (role == currentRole)
        isAllowed = true;
    });
    return isAllowed;
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRoles = route.data.expectedRoles;

    if (
      !this.utils.getCookie('token') || !this.isAuthorized(expectedRoles)
    ) {
      this.snackBar.open("you are not authorized for this", localStorage.getItem('role'), { duration: 1000 })
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
