import { Component, OnInit, OnDestroy, ElementRef, Renderer2 } from '@angular/core';
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

  constructor(public userService: UserService, private elRef: ElementRef, private renderer: Renderer2){}

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

  score(id: string, score: number) {
    this.userService.scoreFavorite(id, score);
    this.scoreStyle(id, score);
  }

  scoreStyle(id: string, score: number) {
    for (let i = 1; i < score + 1; i++) {
      const icon = this.elRef.nativeElement.querySelector(`#star-${ id }-${ i }`);
      this.renderer.setStyle(icon, 'color', 'yellow');
    }
  }

  /***** Delete *****/

  deleteFavorite(id: string) {
    this.userService.deleteFavorite(id);
  }

  deleteBookmark(id: string) {
    this.userService.deleteBookmark(id);
  }
}
