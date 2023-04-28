import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../user/user.service';
import { Book } from '../book.model';


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
    // this.userService.getBooks();
    this.bookSub = this.userService.getBookUpdateListener().subscribe((list: {bookmarks: Book[], favorites: {book: Book, score?: number}[]})=>{
      this.markedBooks = list.bookmarks;
      this.favedBooks = list.favorites;
    })
    this.markedBooks = this.userService.getBookmarks();
    this.favedBooks = this.userService.getFavorites();
  }
  ngOnDestroy() {
    this.bookSub.unsubscribe();
  }
}
