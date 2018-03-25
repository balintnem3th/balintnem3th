import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../authentication.service';
import { SessionUserService } from '../../../session-user.service';
import { Router } from '@angular/router';

import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = this.authenticationService.isLoggedIn();
  signedInUser = '';

  constructor(
    private authenticationService: AuthenticationService,
    private sessionuserService: SessionUserService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.isLoggedIn) {
      this.getLoggedInUser();
    }
  }

  logout() {
    this.authenticationService.logout().subscribe(
      () => { this.router.navigateByUrl('/login'); }
    );
  }

  getLoggedInUser() {
    this.sessionuserService.getLoggedInUser().subscribe(
      (data) => { this.signedInUser = data.name; }
    );
  }
}
