// import { Component } from '@angular/core';
// import { UserService } from '../user/user.service';
// import { Book } from '../book.model';

// @Component({
//   selector: 'app-book-list',
//   templateUrl: './book-list.component.html',
//   styleUrls: ['./book-list.component.css']
// })
// export class BookListComponent {

//   private user: UserService;
//   bookmarks: Book[];
//   favorites: {book: Book, score?: number}[];

//   constructor(user: UserService) {
//     this.user = user;

//   }

//   // private setFavorites()

//   private setBookmarks(books: string[]) {

//   }


//   score(id: string, val: number) {

//   }

// }



// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Subscription } from 'rxjs';
// import { UserService } from '../user/user.service';
// import { Book } from '../book.model';


// @Component({
//   selector: 'app-book-list',
//   templateUrl: './book-list.component.html',
//   styleUrls: ['./book-list.component.css']
// })
// export class BookListComponent implements OnInit, OnDestroy{
//     bookmarks: Book[];
//   favorites: {book: Book, score?: number}[];
//   private bookSub: Subscription;

//   constructor(public userService: UserService){}
//   ngOnInit() {
//     this.userService.getMarkedBooks();
//     this.bookSub = this.userService.getBookUpdateListener().subscribe((books: Book[])=>{
//       this.books = books;
//     })
//   }
//   ngOnDestroy() {
//     this.bookSub.unsubscribe();
//   }
// }
