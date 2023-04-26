import { Injectable } from '@angular/core';
import { Book } from '../book.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  bookmarks: Book[] = [
    // "OL45804W",
    // "OL27448W"
    this.getBook("OL45804W"),
    this.getBook("OL27448W")
  ];
  favorites: {book: Book, score?: number}[] = [
    {book: this.getBook("OL45804W")},
    {book: this.getBook("OL27448W"), score: 3}
    // {id:"OL45804W"},
    // {id: "OL27448W", score: 3}
  ];

  private bookListener = new Subject<{bookmarks: Book[], favorites: {book: Book, score?: number}[]}>();

  constructor() { }

  getBookUpdateListener() {
    return this.bookListener.asObservable();
  }

  favorite(id: string) {
    this.bookmarks.push(this.getBook(id));
    this.bookListener.next({bookmarks: [...this.bookmarks], favorites: [...this.favorites]});
  }

  bookmark(id: string) {
    this.favorites.push({book: this.getBook(id)});
    this.bookListener.next({bookmarks: [...this.bookmarks], favorites: [...this.favorites]});
  }

  getFavorites() {
    return [...this.favorites]
  }

  getBookmarks() {
    return [...this.bookmarks]
  }


  //  Uses the open library api to get information on books from the book ids
  private getBook(id: string) {
    var title, author, author_key, publication;

    fetch(`https://openlibrary.org/books/${ id }.json`)
    .then(response => response.json())
    .then(data => {

      title = data["title"];
      author_key = data["authors"][0]["key"]
      publication = new Date(data["publish_date"]).getFullYear();

    })
    .catch(error => {
      // handle any errors
      console.log("Could not load book.");
      console.log(error);
      return;
    });

    fetch(`https://openlibrary.org${ author_key }.json`)
    .then(response => response.json())
    .then(data => {

      author = data["name"];

    })
    .catch(error => {
      // handle any errors
      console.log("Could not load author.");
      console.log(error);
    });

    const book: Book = {title: title, author: author, publication: publication, id: id};
    return book;
  }

}
