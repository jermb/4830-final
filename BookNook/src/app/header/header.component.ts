import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
// import { Userloginfo } from '../userloginfo';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent /*implements OnInit, OnDestroy*/ {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  // constructor(private userLoginfo: Userloginfo) {}

  // ngOnInit() {
  //   this.userIsAuthenticated = this.userLoginfo.getIsAuth();
  //   this.authListenerSubs = this.userLoginfo
  //     .getAuthStatusListener()
  //     .subscribe(isAuthenticated => {
  //       this.userIsAuthenticated = isAuthenticated;
  //     });
  // }

  // ngOnDestroy() {
  //   this.authListenerSubs.unsubscribe();
  // }
}
