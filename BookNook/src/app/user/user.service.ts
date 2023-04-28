import { Injectable } from '@angular/core';
import { Book } from '../book.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  bookmarks: Book[] = [
    // "OL45804W",
    // "OL27448W"
    // this.getBook("OL45804W"),
    // this.getBook("OL27448W")
    {title: "Title", author: "The Author", publication: 1977, id: "OL45804W"}
  ];
  favorites: {book: Book, score?: number}[] = [
    // {book: this.getBook("OL45804W")},
    // {book: this.getBook("OL27448W"), score: 3}
    // {id:"OL45804W"},
    // {id: "OL27448W", score: 3}
    {book:{title: "Title", author: "The Author", publication: 1977, id: "OL45804W"}, score: 3}
  ];

  private bookListener = new Subject<{bookmarks: Book[], favorites: {book: Book, score?: number}[]}>();

  constructor(private http: HttpClient) { }

  getBookUpdateListener() {
    return this.bookListener.asObservable();
  }

  async favorite(id: string) {
    const book: Book = await this.getBook(id)
    this.bookmarks.push(book);
    this.bookListener.next({bookmarks: [...this.bookmarks], favorites: [...this.favorites]});
  }

  async bookmark(id: string) {
    const book: Book = await this.getBook(id)
    this.favorites.push({book:book});
    this.bookListener.next({bookmarks: [...this.bookmarks], favorites: [...this.favorites]});
  }

  getFavorites() {
    return [...this.favorites]
  }

  getBookmarks() {
    return [...this.bookmarks]
  }


  //  Uses the open library api to get information on books from the book ids
  private async getBook(id: string) {
    var title, author, publication;

    //  Uses the OpenLibrary ID to get information on the book
    await fetch(`https://openlibrary.org/works/${ id }.json`)
    .then(response => response.json())
    .then(data => {
      title = data["title"];
      var author_key = data["authors"][0]["author"]["key"]
      publication = new Date(data["publish_date"]).getFullYear();
      console.log(title);

      //  Uses the author_key to make another api call to get the author name.
      return fetch(`https://openlibrary.org${ author_key }.json`)
    })
    .then(response => response.json())
    .then(data => {
      author = data["name"];
    })
    .catch(error => {
      // handle any errors
      console.log(`Could not load book. https://openlibrary.org/works/${ id }.json`);
      console.log(error);
      return;
    });
    const book: Book = {title: title, author: author, publication: publication, id: id};
    return book;
  }

}
