import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate() {
    return this.checkLogin();
  }

  checkLogin(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    this.router.navigateByUrl('/login');
    return false;
  }
}
