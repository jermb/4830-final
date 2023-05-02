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
  favedBooks: {book: Book, score?: number}[] = [];
  private bookSub: Subscription;

  constructor(public userService: UserService){}

  async ngOnInit() {
    // this.userService.getBooks();
    this.bookSub = this.userService.getBookUpdateListener().subscribe((list: {bookmarks: Book[], favorites: {book: Book, score?: number}[]}) => {
      this.markedBooks = list.bookmarks;
      this.favedBooks = list.favorites;
      console.log(this.favedBooks);
    })
    this.markedBooks = await this.userService.getBookmarks();
    this.favedBooks = await this.userService.getFavorites();
  }
  ngOnDestroy() {
    this.bookSub.unsubscribe();
  }

  /***** Score *****/

  score(id: string) {

  }

  /***** Delete *****/

  deleteFavorite(id: string) {

  }

  deleteBookmark(id: string) {

  }
}
