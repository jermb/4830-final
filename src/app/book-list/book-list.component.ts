import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../user/user.service'; 


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy{
  books: User[] = []
  private bookSub: Subscription;

  constructor(public userService: UserService){}
  ngOnInit() {
    this.userService.getMarkedBooks();
    this.bookSub = this.userService.getBookUpdateListener().subscribe((books: BookList[])=>{
      this.books = books;
    })
  }
  ngOnDestroy() {
    this.bookSub.unsubscribe();
  }
}
