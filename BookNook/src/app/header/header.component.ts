import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
// import { Userloginfo } from '../userloginfo';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private Userloginfo: Userloginfo) {}

  ngOnInit() {
    this.userIsAuthenticated = this.Userloginfo.getIsAuth();
    this.authListenerSubs = this.Userloginfo
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
