import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Book } from '../book.model';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  books: Book[];

  constructor(private userService: UserService) {}

  search(form: NgForm) {
    console.log("searching");
    fetch(`https://openlibrary.org/search.json?${ form.value.searchType }=${ this.urlize(form.value.searchTerms) }`)
    .then(response => response.json())
    .then(data => {
      var docs = data["docs"];
      var tempBooks: Book[] = [];
      // console.log(docs[0])

      for (var item in docs) {
        item = docs[item];
        const key = item["key"].replace("/works/", "");
        const book: Book = { title: item["title"], author: item["author_name"], publication: item["first_publish_year"], id: key };
        console.log(item);
        console.log(book);
        tempBooks.push(book);
      }

      console.log(tempBooks[0].title);

      this.books = [...tempBooks];
    })
    .catch(error => {
      // handle any errors
      console.log("Search did not return any results.");
      console.log(error);
    });
  }


  favorite(id: string) {
    this.userService.favorite(id);
  }

  bookmark(id: string) {
    this.userService.favorite(id);
  }


  private urlize(text: string) {
    var term = "";
    text.split(" ").forEach(word => {
      if (term == "") {
        term += word;
      }
      else {
        term += "+" + word
      }
    });
    return term;
  }

}
