import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { Userloginfo } from '../login/userloginfo';
import {MatMenuModule} from '@angular/material/menu';
import { AuthService } from '../authenticate/authenticate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  //constructor(private Userloginfo: Userloginfo) {}
  constructor(private auth: AuthService) {

  }
  ngOnInit() {
    this.userIsAuthenticated = this.auth.getIsAuth();
    console.log(this.userIsAuthenticated);

    /*
    this.userIsAuthenticated = this.Userloginfo.getIsAuth();
    this.authListenerSubs = this.Userloginfo
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
      */
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  logout() {
    this.auth.logout();
  }
}
