import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  bookmarks: string[] = [
    "OL45804W",
    "OL27448W"
  ];
  favorites: {id: string, score?: number}[] = [
    {id:"OL45804W"},
    {id: "OL27448W", score: 3}
  ];

  constructor() { }

  favorite(id: string) {

  }

  bookmark(id: string) {

  }

  getFavorites() {
    return [...this.favorites]
  }

  getBookmarks() {
    return [...this.bookmarks]
  }


}
