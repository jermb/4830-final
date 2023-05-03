import { Injectable } from '@angular/core';
import { Book } from '../book.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  bookmarks: Book[] = [];
  favorites: {book: Book, score?: number}[] = [];

  private readonly url = "http://localhost:3000/api/";

  //  One Listener for both arrays
  private bookListener = new Subject<{bookmarks: Book[], favorites: {book: Book, score?: number}[]}>();

  constructor(private http: HttpClient) { }

  getBookUpdateListener() {
    return this.bookListener.asObservable();
  }

  /***** Adds *****/
  async favorite(id: string) {
    const token = localStorage.getItem("token");
    if (token == null) return;

    const book: Book = await this.getBook(id);
    console.log(book);
    this.http.post<{message: string}>(`${ this.url }favorites/add`, { token: token, id: id }).subscribe((response) => {
      this.favorites.push({ book: book });
      this.bookListener.next({ bookmarks: [...this.bookmarks], favorites: [...this.favorites] });
      console.log(response.message);
    })
  }

  async bookmark(id: string) {
    const token = localStorage.getItem("token");
    if (token == null) return;

    const book: Book = await this.getBook(id)
    this.http.post<{message: string}>(`${ this.url }bookmarks/add`, { token: token, id: id }).subscribe((response) => {
      this.bookmarks.push(book);
      this.bookListener.next({bookmarks: [...this.bookmarks], favorites: [...this.favorites]});
      console.log(response.message);
    })
  }


  /***** Get *****/
  async getFavorites() {
    const token = localStorage.getItem("token");
    if (token == null) return;

    await this.http.post<{message:string, favorited: {id: string, score?: number}[]}>(
      `${ this.url }favorites`, { token: token }).subscribe(async (data)=> {
        //  Converts each bookID into a Book object and maps them into the favorites array
        this.favorites = await Promise.all(data.favorited.map(async (item) => {
          return {book: await this.getBook(item.id), score: item.score};
        }));
        console.log(this.favorites);
        this.bookListener.next({bookmarks: [...this.bookmarks], favorites: [...this.favorites]});
    });
    return [...this.favorites];
  }

  async getBookmarks() {

    const token = localStorage.getItem("token");
    if (token == null) return;

    await this.http.post<{message:string, bookmarked: string[]}>(
      `${ this.url }bookmarks`, { token: token }).subscribe(async (data)=> {
        //  Converts each bookID into a Book object and stores them in the bookmarks array
        this.bookmarks = await Promise.all(data.bookmarked.map(bookID => this.getBook(bookID)));
        this.bookListener.next({bookmarks: [...this.bookmarks], favorites: [...this.favorites]});
    });
    return [...this.bookmarks];
  }


  /***** Delete *****/
  deleteFavorite(id: string) {
    this.http.delete(`${ this.url }favorites/${ id }`, {body: { token: this.token() }}).subscribe((
      )=>{
        const updatedFavs = this.favorites.filter(book => book.book.id !== id);
        this.favorites = updatedFavs;
        this.bookListener.next({bookmarks: [...this.bookmarks], favorites: [...this.favorites]});
      })
  }

  deleteBookmark(id: string) {
    this.http.delete(`${ this.url }bookmarks/${ id }`, { body: {token: this.token() }}).subscribe((
      )=>{
        const updatedBookmarks = this.bookmarks.filter(book => book.id !== id);
        this.bookmarks = updatedBookmarks;
        this.bookListener.next({bookmarks: [...this.bookmarks], favorites: [...this.favorites]});
      })
  }


  /***** Score *****/
  scoreFavorite(id:string, score: number) {
    this.http.post(`${ this.url }favorites/score`, { id: id, score: score }).subscribe((response) => {

    })
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
      publication = new Date(data["first_publish_date"]).getFullYear();
      if (Number.isNaN(publication)) publication = new Date(data["publish_date"]).getFullYear();
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

  private token() {
    return localStorage.getItem("token");
  }

}
