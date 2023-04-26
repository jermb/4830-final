import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../user/user.service'; 


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy{
  markedBooks: Book[] = []
  favedBooks: {book: Book, score?: number}[]
  private bookSub: Subscription;

  constructor(public userService: UserService){}
  ngOnInit() {
    this.userService.getBooks();
    this.bookSub = this.userService.getBookUpdateListener().subscribe((markedBooks: Book[], favedBooks: {book: Book, score?: number}[])=>{
      this.markedBooks = markedBooks;
      this.favedBooks = favedBooks;
    })
  }
  ngOnDestroy() {
    this.bookSub.unsubscribe();
  }
}
